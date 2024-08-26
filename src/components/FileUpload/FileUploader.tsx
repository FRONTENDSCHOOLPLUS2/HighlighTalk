import './_FileUploader.scss';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import removeDateTimeAndUserKey from '@/utils/removeDateTimeAndUserKey';
import UploadArea from './UploadArea/UploadArea';
import validateAndTrimData from '@/utils/validateAndTrimData';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';
import { LoadingSpinner } from '../Spinner/Spinner';

const promptForFree: string = process.env.NEXT_PUBLIC_AI_PROMPT || '';
const promptForLovers: string = process.env.NEXT_PUBLIC_AI_PROMPT_COUPLE || '';
const fullURL = process.env.NEXT_PUBLIC_APP_SERVER;

interface CSVRow {
  [key: string]: string;
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

  const router = useRouter();

  // console.log(pathname);

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
      setIsLoading(true);
      parseCSV(file);
    }
  };
  // csv파일을 읽어 파싱하는 함수
  const parseCSV = (file: File) => {
    setIsLoading(true); // 파일 파싱을 시작할 때 로딩 상태 설정
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: ParseResult<CSVRow>) => {
        setCsvData(result.data);
        setIsLoading(false); // 파일 파싱이 완료되면 로딩 상태 해제
        setIsModalOpen(true);
        setCurrentStep(2);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setIsLoading(false); // 에러가 발생해도 로딩 상태 해제
      },
    });
  };

  useEffect(() => {
    const processCSVData = () => {
      const copyData = removeDateTimeAndUserKey(JSON.stringify(csvData));
      const result = validateAndTrimData(copyData);
      // console.log('resres', result.data);
      const data = JSON.stringify(result.data);
      // console.log('Data', data);
      setSendMessage(data);
    };
    processCSVData();
  }, [csvData]);

  // useEffect(() => {
  //   console.log('sendMessage', sendMessage);
  // }, [sendMessage]);

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

      const data = await response.json();
      // console.log('xxxxx', data);
      router.push(`${fullURL}/${pathname}/${data?.secondData?.item._id}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="file-uploader-container">
      {isLoading && <LoadingSpinner />}
      {/* currentStep 1과 2는 안에서 처리함 */}
      <UploadArea
        handleFileChange={handleFileChange}
        setCurrentStep={setCurrentStep}
        fetchData={fetchData}
        fileInputRef={fileInputRef}
        currentStep={currentStep}
        fileName={fileName}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content="감사합니다! 이제 분석을 시작 할 수 있어요!"
          title="파일 업로드 성공"
          buttons={[{ label: '닫기', onClick: closeModal, theme: 'secondary' }]}
        />
      )}
    </div>
  );
}

export default FileUpLoader;
