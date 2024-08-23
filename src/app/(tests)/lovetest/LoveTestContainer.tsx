'use client';

import { useState } from 'react';
import './_loveTestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import Button from '@/components/Button/Button';

function LoveTestContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="test-page-cover">
      {currentStep === 1 && (
        <>
          <div className="test-page-container">
            <h1>썸남,썸녀,연애 이대로 괜찮을까?</h1>
            <section className="test-page-content">
              <p>내 썸남,남친 처럼 이뤄지고 싶은 사람의 톡을 ~</p>
            </section>
            <div className="test-page-action">
              <Button type="button" onClick={() => setCurrentStep(2)}>
                테스트 시작하기
              </Button>
            </div>
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

export default LoveTestContainer;
