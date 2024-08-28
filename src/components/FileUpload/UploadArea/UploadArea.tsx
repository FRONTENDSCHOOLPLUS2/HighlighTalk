import React, { ChangeEvent, DragEvent, RefObject, useState } from 'react';
import './_UploadArea.scss';
import DescriptionArea from '../Description/DescriptionArea';

interface UploadAreaProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  currentStep: number;
  fileName: string;
  fetchData: () => Promise<void>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function UploadArea({
  handleFileChange,
  fileInputRef,
  currentStep,
  fileName,
  setCurrentStep,
  fetchData,
}: UploadAreaProps) {
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 추가
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateFileType = (file: File) => {
    const allowedExtensions = ['csv', 'txt']; // .txt 파일도 허용으로 변경
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
  };

  const handleFileChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFileType(file)) {
        setError(null); // 파일 형식이 올바르면 에러 초기화
        handleFileChange(e); // 실제 파일 처리 로직 호출
      } else {
        setError('CSV 파일만 업로드 가능합니다.'); // 파일 형식이 올바르지 않으면 에러 메시지 설정
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // 파일 입력 초기화
        }
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFileType(file)) {
        setError(null); // 파일 형식이 올바르면 에러 초기화
        const changeEvent = {
          target: {
            files: e.dataTransfer.files,
          },
        } as ChangeEvent<HTMLInputElement>;
        handleFileChange(changeEvent); // 실제 파일 처리 로직 호출
      } else {
        setError('CSV 또는 TXT 파일만 업로드 가능합니다.');
      }
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  if (currentStep === 1) {
    return (
      <div className="file-uploader-container">
        <div className="divide-section">
          <DescriptionArea />
          <div
            className={error ? 'upload-area error' : 'upload-area success'}
            onClick={openFileDialog} // 여기에만 onClick 핸들러를 설정
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className={'upload-area-section'}>
              <div className="speechs">
                <div className={error ? 'speech-iconError' : 'speech-icon'}></div>
                <div className={'speech-bubble'}>
                  {error
                    ? error
                    : '클릭 또는 파일을 끌어당겨 넣을 수 있어요! (.csv, .txt 파일만 가능)'}
                </div>
                <button type="button">파일 올리기</button>
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              accept=".csv,.txt"
              onChange={handleFileChangeWrapper} // 파일 형식 검사 로직을 포함한 핸들러
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>
      </div>
    );
  } else if (currentStep === 2) {
    return (
      <div className="file-uploader-container">
        <div className="divide-section">
          <DescriptionArea />
          <div className="upload-area">
            <div className="upload-area-section">
              <div className="speechs">
                <div className="speech-icon"></div>
                <div className="speech-bubble">{fileName} 업로드 완료!</div>
              </div>
              <button onClick={fetchData}>분석 시작하기</button>
              <button
                className="graybtn"
                onClick={() => {
                  setCurrentStep(1);
                }}
              >
                다시 업로드
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default UploadArea;
