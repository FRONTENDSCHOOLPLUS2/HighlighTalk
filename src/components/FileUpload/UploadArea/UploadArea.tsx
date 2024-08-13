import React, { ChangeEvent, DragEvent, RefObject } from 'react';
import './_UploadArea.scss';
import DescriptionArea from '../Description/DescriptionArea';
import Button from '@/components/Button/Button';

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
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileInput = e.dataTransfer.files[0];
      const changeEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      } as ChangeEvent<HTMLInputElement>;
      handleFileChange(changeEvent);
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
            className="upload-area"
            onClick={openFileDialog} // 여기에만 onClick 핸들러를 설정
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="upload-area-section">
              <div className="speechs">
                <div className="speech-icon"></div>
                <div className="speech-bubble">클릭 또는 파일을 끌어당겨 넣을 수 있어요!</div>
                <button type="button">파일 올리기</button>
              </div>
            </div>
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
