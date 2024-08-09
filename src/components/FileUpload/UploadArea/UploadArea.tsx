import React, { ChangeEvent, RefObject } from 'react';
import './_UploadArea.scss';
import '../Description/DescriptionArea';
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
  // 파일 선택 창을 여는 함수
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (currentStep === 1) {
    return (
      <div className="file-uploader-container">
        <div className="divide-section">
          <DescriptionArea />
          <div className="upload-area">
            <label htmlFor="fileInput" className="upload-area-section" onClick={openFileDialog}>
              <div className="speechs">
                <div className="speech-icon"></div>
                <div className="speech-bubble">클릭 또는 파일을 끌어당겨 넣을 수 있어요!</div>
                <button type="button">파일 올리기</button>
              </div>
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
      </div>
    );
  } else if (currentStep === 2) {
    return (
      <div className="file-uploader-container">
        <div className="divide-section">
          <DescriptionArea />
          <div className="upload-area">
            <label htmlFor="fileInput" className="upload-area-section">
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
            </label>
          </div>
        </div>
      </div>
    );
  }

  return null; // 기본 return 문 추가
}

export default UploadArea;
