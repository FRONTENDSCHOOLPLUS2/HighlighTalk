import './_FileUploader.scss';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import removeDateTimeAndUserKey from '@/utils/removeDateTimeAndUserKey';
import UploadArea from './UploadArea/UploadArea';
import validateAndTrimData from '@/utils/validateAndTrimData';
import { usePathname } from 'next/navigation';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const promptForFree: string = process.env.NEXT_PUBLIC_AI_PROMPT || '';
const promptForLovers: string = process.env.NEXT_PUBLIC_AI_PROMPT_COUPLE || '';

interface CSVRow {
  [key: string]: string;
}

interface FetchDataResponse {
  choices: { message: { content: string } }[];
}

function FileUpLoader() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [sendMessage, setSendMessage] = useState('');
  const [prompt, setPrompt] = useState<string>(process.env.NEXT_PUBLIC_AI_PROMPT || '');
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // accessToken을 세션에서 가져오기

  // 모달을 여는 함수
  const openModal = () => setIsModalOpen(true);
  // 모달을 닫는 함수
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // 패스네임에 따른 프롬프트 설정
    switch (pathname) {
      case '/freetest':
        setPrompt(promptForFree);
        break;
      case '/lovetest':
        setPrompt(promptForLovers);
        break;
      default:
        setPrompt(process.env.NEXT_PUBLIC_AI_PROMPT || '');
    }
  }, [pathname]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
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
    const processCSVData = () => {
      const copyData = removeDateTimeAndUserKey(JSON.stringify(csvData));
      const result = validateAndTrimData(copyData);
      console.log('resres', result.data);
      const data = JSON.stringify(result.data);
      console.log('Data', data);
      setSendMessage(data);
    };
    processCSVData();
  }, [csvData]);

  useEffect(() => {
    console.log('sendMessage', sendMessage);
  }, [sendMessage]);

  const fetchData = async () => {
    if (csvData.length === 0) return;
    setIsLoading(true); // 로딩 시작
    try {
      // 첫 번째 POST 요청
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          message: sendMessage,
        }),
      });

      const data: FetchDataResponse = await response.json();
      const fetchedContent = data.choices[0].message.content;
      console.log('Fetched Data:', fetchedContent);

      setCurrentStep(3); // 데이터 분석 후 결과 단계로 이동
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="file-uploader-container">
      {/* currentStep 1과 2는 안에서 처리함 */}
      <UploadArea
        handleFileChange={handleFileChange}
        setCurrentStep={setCurrentStep}
        fetchData={fetchData}
        fileInputRef={fileInputRef}
        currentStep={currentStep}
        fileName={fileName}
      />

      {/* 결과가 들어가면 됨 */}
      {currentStep === 3 && (
        <div className="result-display">
          {/* {pathname === '/freetest' && <TestPage />} */}
          {pathname === '/lovetest' && <div>준비중</div>}
          <Button type="button" onClick={() => setCurrentStep(2)}>
            이전 단계
          </Button>
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content="확인을 누른 후 분석을 시작해요"
          title="파일 업로드 성공"
          buttons={[
            { label: '닫기', onClick: closeModal, theme: 'primary' },
            // { label: '확인', onClick: openModal, theme: 'primary' },
          ]}
        />
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
