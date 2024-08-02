'use client';
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Papa from 'papaparse';
import './FileUploader.scss';
import FetchData from '../fetchData';

function FileUpLoader() {
  const [currentStep, setCurrentStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [result, setResult] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const prompt =
    "다음대화를읽고,'result'json 객체를 생성하여 반환하세요.'result'객체는다음과같은구조를가져야합니다topic:{summary:'대화내용요약'},mbti:{analysis:'인물별 MBTI분석및이유를배열로'},talkCount:{counts:'인물별말한횟수'},mostWords:{topWords:'가장많이 사용된 단어 상위 3개를반환 다만 글자는 두글자 이상 사람이름제외 없으면없다해도됨'}}.모든필드를채워주세요.줄바꿈은하지마세요입력이없을때는빈문자를주세요";

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
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
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

  const fetchData = async () => {
    if (csvData.length === 0) return;
    try {
      const csvDataString = JSON.stringify(csvData);
      console.log('Sending data to FetchData:', csvDataString);
      const data = await FetchData(prompt, csvDataString);
      console.log('Fetched Data:', data);
      setResult(JSON.stringify(data, null, 2));
      setCurrentStep(3); // 데이터 분석 후 결과 단계로 이동
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Error fetching data');
    }
  };

  return (
    <div className="file-uploader-container">
      {currentStep === 1 && (
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
      )}

      {currentStep === 2 && (
        <div className="csv-data-display">
          <h3>원본 CSV Data</h3>
          {csvData.length > 0 ? (
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          ) : (
            <p>업로드된 데이터 없음</p>
          )}
          <button onClick={fetchData}>데이터 분석</button>
          <button onClick={() => setCurrentStep(1)}>이전 단계</button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="result-display">
          <h3>Fetch Data Result</h3>
          {result ? <pre>{result}</pre> : <p>결과 없음</p>}
          <button onClick={() => setCurrentStep(2)}>이전 단계</button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>파일이 업로드되었습니다</h2>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpLoader;
