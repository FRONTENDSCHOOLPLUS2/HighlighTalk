'use client';

import { useModalStore } from '@/store/ModalStore';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import './_WelcomeCoinModal.scss';
import { OrderInfoType } from '@/types/order';
import { createOrderData } from '@/serverActions/orderAction';

// NOTE - 회원가입 축하 코인 지급 안내 모달
function WelcomeCoinModal({ isNewUser }: { isNewUser: string | undefined }) {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [cookieDeleted, setCookieDeleted] = useState(false);
  const router = useRouter();
  const WELCOME_COIN = 100;

  // console.log('useEffect 실행, isNewUser>', isNewUser);

  const orderDataWithSignup: OrderInfoType = {
    order_type: 'charge',
    amount: 0,
    coin_amount: WELCOME_COIN,
    payment_method: '가입 축하 코인 🎉',
    extra: {
      balance_before: 0,
      balance_after: WELCOME_COIN,
    },
  };

  useEffect(() => {
    const cookie = getCookie(isNewUser as string);

    if (isNewUser && cookie && !cookieDeleted) {
      openModal();
    }
  }, [isNewUser, cookieDeleted, openModal]);

  // FIXME - 함수 내용이 중복되는 부분 코드 수정 필요
  const handleCloseModal = async () => {
    if (isNewUser) {
      deleteCookie(isNewUser);
      setCookieDeleted(true);
    }
    await createOrderData('charge', orderDataWithSignup);
    closeModal();
  };

  const handleGoTestButton = async () => {
    if (isNewUser) {
      deleteCookie(isNewUser);
      setCookieDeleted(true);
    }
    closeModal();
    await createOrderData('charge', orderDataWithSignup);
    router.push('/freetest');
  };

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="🎉 회원가입을 축하합니다!"
          content="가입 축하 100 코인이 지급되었어요."
          buttons={[]}
        >
          <div className="modal-content-buttons">
            <Button onClick={() => handleCloseModal()} theme="secondary" styleType="outlined">
              닫기
            </Button>
            <Button onClick={() => handleGoTestButton()} theme="secondary">
              지금 바로 분석하러 가기
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default WelcomeCoinModal;
