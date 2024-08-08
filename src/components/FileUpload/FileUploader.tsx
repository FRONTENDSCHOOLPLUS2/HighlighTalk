'use client';

import './FileUploader.scss';
import { useState, useRef, ChangeEvent, DragEvent, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import FetchData from '@/hooks/fetchData';

const prompt: string = process.env.NEXT_PUBLIC_AI_PROMPT || '';

interface CSVRow {
  [key: string]: string;
}

interface FetchDataResponse {
  choices: { message: { content: string } }[];
}

interface FinalData {
  content?: string;
}

function FileUpLoader() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dragging, setDragging] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [result, setResult] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [final, setFinal] = useState<FinalData>({});
  const [sendMessage, setSendMessage] = useState('');

  const removeDateTimeAndUserKey = (text: string): string => {
    const dateTimeRegex = /"Date":"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}",?/g;
    const userRegex = /"User":"([^"]*)",?/g;
    const cleanedText = text.replace(dateTimeRegex, '').replace(userRegex, '"$1",').trim();
    // 필요에 따라 문자열을 정리 (불필요한 콤마 제거 등)
    return cleanedText.replace(/,}/g, '}').replace(/,]/g, ']').trim();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseCSV(file);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      parseCSV(file);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: ParseResult<CSVRow>) => {
        console.log('Parsed CSV data:', result.data);
        setCsvData(result.data);

        setIsModalOpen(true);
        setCurrentStep(2); // 파일 업로드 후 다음 단계로 이동
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  useEffect(() => {
    const copyCSV = [...csvData];
    const copyResult = JSON.stringify(copyCSV);
    const copyData = removeDateTimeAndUserKey(copyResult);
    setSendMessage(copyData);
    console.log('sendMessage', sendMessage);
  }, [csvData]);

  const fetchData = async () => {
    if (csvData.length === 0) return;
    setIsLoading(true); // 로딩 시작
    try {
      const data: FetchDataResponse = await FetchData(prompt, sendMessage);
      console.log('response', data);
      const fetchedContent = data.choices[0].message.content;
      console.log('Fetched Data:', fetchedContent);
      setFinal({ content: fetchedContent });
      setResult(JSON.stringify(data, null, 2));
      setCurrentStep(3); // 데이터 분석 후 결과 단계로 이동
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Error fetching data');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (final && final.content) {
      const finalData = JSON.parse(final.content);
      console.log('xx', finalData);
    }
  }, [final]);

  return (
    <div className="file-uploader-container">
      {currentStep === 1 && (
        <div>
          <div className="upload-area">
            <label
              htmlFor="fileInput"
              className={dragging ? 'dragging' : 'default'}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {dragging ? '여기에 드롭' : '여기에 파일을 Drag & Drop(.csv, .txt)'}
            </label>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              accept=".csv,.txt"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="csv-data-display">
          <h3>원본 CSV Data</h3>
          {csvData.length > 0 ? (
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          ) : (
            <p>업로드된 데이터 없음</p>
          )}
          <button type="button" onClick={fetchData} disabled={isLoading}>
            데이터 분석
          </button>
          <button type="button" onClick={() => setCurrentStep(1)}>
            이전 단계
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="result-display">
          <h3>Fetch Data Result</h3>
          {result ? <pre>{result}</pre> : <p>결과 없음</p>}
          <button type="button" onClick={() => setCurrentStep(2)}>
            이전 단계
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>파일이 업로드되었습니다</h2>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>데이터를 분석 중입니다...</p>
        </div>
      )}
    </div>
  );
}

export default FileUpLoader;
