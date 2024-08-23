'use client';

import { useState } from 'react';
import './_TestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import Button from '@/components/Button/Button';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { PostItem } from '@/types';

function FreeTestContainer({ totalCount }: { totalCount: number }) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="test-page-cover">
      {currentStep === 1 && (
        <>
          <div className="test-page-container">
            <h1>카톡방 분석 서비스 시작하기</h1>
            <section className="test-page-content">
              <p>
                <h1>지금 까지 {totalCount + 1000}번 테스트가 진행 됐어요</h1>
              </p>
            </section>
            <div className="test-page-action">
              <Button type="button" theme="secondary" onClick={() => setCurrentStep(2)}>
                테스트 시작하기
              </Button>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <ProtectedRoute setCurrentStep={setCurrentStep}>
            {/* 인증된 사용자만 이 부분이 렌더링됨 */}
            <FileUpLoader />
          </ProtectedRoute>
        </>
      )}
    </div>
  );
}

export default FreeTestContainer;
