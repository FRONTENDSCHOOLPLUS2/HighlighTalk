'use client';

import { useState } from 'react';
import './_TestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';

function TestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="test-page-container">
      {currentStep === 1 && (
        <>
          <h1>카톡방 분석 서비스 시작하기</h1>
          <section className="test-page-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nobis porro inventore
              reprehenderit! Sint, praesentium cumque quis quam voluptatibus voluptatem porro beatae
              nesciunt repellat earum mollitia! Voluptas rem tenetur sed!
            </p>
          </section>
          <div className="test-page-action">
            <button
              className="start-test-button"
              onClick={() => {
                setCurrentStep(2);
              }}
            >
              테스트 시작하기
            </button>
          </div>
        </>
      )}
      {/* 테스트 시작하면 나오는 화면 */}
      {currentStep === 2 && (
        <>
          <FileUpLoader />
        </>
      )}
    </div>
  );
}

export default TestPage;
