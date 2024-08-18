'use client';

import { useState } from 'react';
import './_TestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import Button from '@/components/Button/Button';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

// REVIEW - next step 버튼만 제어중인데 미들웨어에서 추가 처리 핋요할까?
function TestPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="test-page-container">
      {currentStep === 1 && (
        <>
          <div className="test-page-container">
            <h1>카톡방 분석 서비스 시작하기</h1>
            <section className="test-page-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nobis porro inventore
                reprehenderit! Sint, praesentium cumque quis quam voluptatibus voluptatem porro
                beatae nesciunt repellat earum mollitia! Voluptas rem tenetur sed!
              </p>
            </section>
            <div className="test-page-action">
              <Button type="button" onClick={() => setCurrentStep(2)}>
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

export default TestPage;
