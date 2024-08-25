'use client';

import { useState } from 'react';
import './_FreeTestPage.scss';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

function FreeTestContainer({ totalCount }: { totalCount: number }) {
  const [currentStep, setCurrentStep] = useState(1);

  // 공유
  const handleShareURL = () => {
    const text = `[ 하이라이톡 - 우리는 어떻게 대화하고 있을까? ]\n🤖하이라이톡 에서 테스트 해보세요!\n\nURL - ${location.href}`;

    //모바일
    if (navigator.share) {
      navigator
        .share({
          title: '하이라이톡 - AI 분석 결과',
          text: text,
          url: location.href,
        })
        .then(() => {
          console.log('공유 성공!');
        })
        .catch((error) => {
          console.error('공유 실패:', error);
        });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast('클립보드에 URL이 복사되었어요!');
        })
        .catch((error) => {
          alert('클립보드에 복사하는데 실패했어요. 직접 복사해 주세요: ' + text);
        });
    }
  };

  // 토스트 알림 함수
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(toast);

    // 3초 후에 토스트 메시지 사라짐
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500); // 0.5초 후에 DOM에서 제거
    }, 3000); // 3초 동안 토스트 표시
  };

  return (
    <div className="test-page-cover">
      {currentStep === 1 && (
        <>
          <div className="test-page-container">
            <h1 className="page-header">우리 톡방의 AI 분석</h1>
            <section className="test-page-content">
              <h2 className="page-headerSub">
                지금 까지 <span>⭐️{totalCount + 1000}⭐️</span>번의 테스트가 진행 됐어요!
              </h2>
              <p className="sub-p">하이라이톡에서 대화내용을 업로드 해 AI분석을 시작 하세요!</p>
              <div className="test-page-action">
                <button onClick={() => handleShareURL()} className="btn n1">
                  공유하기
                </button>
                <button onClick={() => setCurrentStep(2)} className="btn n2">
                  시작하기
                </button>
              </div>
              <div className="page-mokup"></div>
            </section>
          </div>

          <section className="freetest-description">
            <div className="des-header">
              <h1 className="header-title">대화 내용 뿐만 아니라</h1>
              <h1 className="header-title">나와 대화하는 친구들의 성향까지</h1>
              <p className="header-sub">함께 대화한 친구들의 MBTI를 예측 해 볼 수 있어요</p>
            </div>
            <div className="des-image"></div>
          </section>

          <section className="freetest-card">
            <h1 className="card-title">어떤 분석을 해주나요?</h1>
            <div className="card-content">
              <div className="card-wrapper">
                <div className="contents">
                  <h1>대화 내용 3가지 요약</h1>
                  <p>대화의 중심을 뭐시기.. 해요</p>
                  <p>어떻게 해서 무슨 기술을 통해 톡방 내용을 3가지로 요약</p>
                </div>
                <div className="contents-img"></div>
              </div>
            </div>
          </section>
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
