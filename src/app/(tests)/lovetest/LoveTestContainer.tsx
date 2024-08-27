'use client';

import { useState } from 'react';
import FileUpLoader from '@/components/FileUpload/FileUploader';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { shareURL } from '@/utils/shareURL';
import { useSession } from '@/app/providers';
import { useModalStore } from '@/store/ModalStore';
import PayModal from '@/components/Modal/PayModal/PayModal';
import { TEST_PRODUCT } from '@/data/TEST_PRODUCT';
import ProductPayModalContents from '@/components/Modal/PayModal/PayModalContents/ProductPayModalContents';
import { updateCoinData } from '@/serverActions/coinAction';
import './_loveTestPage.scss';
import { createOrderData, updateUserOrderList } from '@/serverActions/orderAction';
import { OrderInfoType } from '@/types/order';

function LoveTestContainer({ totalCount }: { totalCount: number }) {
  const session = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const { isOpen, openModal, closeModal } = useModalStore();
  const TEST_INFO = TEST_PRODUCT.lovetest;

  const userCoin = session?.user?.coin || 0;
  const userId = session?.user?.id!;

  const handleStartBtnClick = () => {
    // TODO - 개발시에는 이 안의 내용 주석하고 작업하기 (결제내역 있으면 모달 스킵하는 내용)
    const hasPurchased = session?.user?.orderList?.includes(TEST_INFO.code);
    if (hasPurchased) {
      setCurrentStep(2);
    } else {
      openModal();
    }
    openModal();
  };

  // REVIEW - 이 부분 setCurrent가 의도대로 동작하지 않음
  const handlePayButton = async () => {
    try {
      await updateCoinData(userId, userCoin - TEST_INFO.price);
      await updateUserOrderList(TEST_INFO.code);

      const orderData: OrderInfoType = {
        order_type: 'pay',
        amount: 0, // 현금이 아님을 의미
        coin_amount: TEST_INFO.price,
        payment_method: TEST_INFO.title,
        extra: {
          balance_before: userCoin,
          balance_after: userCoin - TEST_INFO.price,
        },
      };
      closeModal();

      // 5. 주문 데이터 생성
      await createOrderData('pay', orderData);

      // 6. 현재 단계 변경
      setCurrentStep(2);
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
          title={`결제를 진행합니다.`}
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
