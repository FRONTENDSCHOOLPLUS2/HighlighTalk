'use client';

import { useState } from 'react';
import './TestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';

function TestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const a: any = 1;
  return (
    <div className="test-page-container">
      {currentStep === 1 && (
        <>
          <header className="test-page-header">
            <h1>카톡방 분석 서비스 시작하기</h1>
          </header>
          <section className="test-page-content">
            <p>
              ;Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nobis porro inventore
              reprehenderit! Sint, praesentium cumque quis quam voluptatibus voluptatem porro beatae
              nesciunt repellat earum mollitia! Voluptas rem tenetur sed!
            </p>
            <p>
              별빛이 내린다 샤라라라라라랄별빛이 내린다 샤라라라라라랄별빛이 내린다
              샤라라라라라랄별빛이 내린다 샤라라라라라랄 별빛이 내린다 샤라라라라라랄
            </p>
            <p>
              별빛이 내린다 샤라라라라라랄별빛이 내린다 샤라라라라라랄별빛이 내린다
              샤라라라라라랄별빛이 내린다 샤라라라라라랄 별빛이 내린다 샤라라라라라랄
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

      {currentStep === 2 && (
        <>
          <FileUpLoader />
        </>
      )}
    </div>
  );
}

export default TestPage;
