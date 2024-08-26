'use client';

import { useState } from 'react';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { shareURL } from '@/utils/shareURL';
import { useSession } from '@/app/providers';
import { useModalStore } from '@/store/ModalStore';
import PayModal from '@/components/Modal/PayModal/PayModal';
import Button from '@/components/Button/Button';
import './_loveTestPage.scss';
import { TEST_PRODUCT } from '@/data/TEST_PRODUCT';
import ProductPayModalContents from '@/components/Modal/PayModal/PayModalContents/ProductPayModalContents';

function LoveTestContainer({ totalCount }: { totalCount: number }) {
  const session = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const { isOpen, openModal, closeModal } = useModalStore();

  const handleStartBtnClick = () => {
    openModal();
    // setCurrentStep(2);
  };

  const handleModal = () => {
    console.log('handleModal~~');
  };

  const handlePayButton = () => {
    console.log('handlePayButton');
  };

  return (
    <>
      <div className="loveTestContainer">
        <div className="test-page-cover">
          {currentStep === 1 && (
            <>
              <div className="test-page-container">
                <h1 className="page-header">사랑하는 사람과 나의 톡방 AI 분석</h1>
                <section className="test-page-content">
                  <h2 className="page-headerSub">
                    지금 까지 <span className="page-title-count">❤️{totalCount + 120}❤️</span>번의
                    테스트가 진행 됐어요!
                  </h2>
                  <p className="sub-p">하이라이톡에서 대화내용을 업로드 해 AI분석을 시작 하세요!</p>
                  <div className="test-page-action">
                    <button
                      onClick={() => shareURL('🤖하이라이톡에서 테스트 해보세요!')}
                      className="btn n1"
                    >
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
                  <h1 className="header-title">많이 표현한 감정을 토대로</h1>
                  <h1 className="header-title">좋아하는 사람과의 관계를 예측하고</h1>
                  <p className="header-sub">
                    다양한 그래프로 사랑하는 사람의 감정을 파악 할 수 있어요
                  </p>
                </div>
                <div className="des-image n1"></div>
                <div className="des-image n2"></div>
              </section>
            </>
          )}
        </div>
        {currentStep === 2 && (
          <>
            <ProtectedRoute setCurrentStep={setCurrentStep}>
              {/* 인증된 사용자만 이 부분이 렌더링됨 */}
              <FileUpLoader />
            </ProtectedRoute>
          </>
        )}
      </div>
      {isOpen && (
        <PayModal
          isOpen={isOpen}
          onClose={closeModal}
          title={`결제를 진행해 주세요.`}
          amount={100}
          session={session}
          content=""
        >
          <ProductPayModalContents
            test={TEST_PRODUCT.lovetest}
            coin={session?.user?.coin}
            closeModal={closeModal}
            handlePayButton={handlePayButton}
          />
        </PayModal>
      )}
    </>
  );
}

export default LoveTestContainer;
