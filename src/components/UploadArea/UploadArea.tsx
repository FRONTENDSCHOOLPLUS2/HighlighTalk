import React, { ChangeEvent } from 'react';

interface UploadAreaProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
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
  if (currentStep === 1) {
    return (
      <div className="file-uploader-container">
        <div className="divide-section">
          <div className="description-area">설명을 할거에요✅</div>
          <div className="upload-area">
            <label htmlFor="fileInput" className="upload-area-section">
              파일을 끌어당겨 넣을 수 있어요
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
          <div className="description-area">설명충</div>
          <div className={`upload-area ${fileName ? 'success' : ''}`}>
            <h1>{fileName} 업로드 완료!</h1>
            <button onClick={fetchData}>데이터 분석</button>
            <button
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              이전
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadArea;
