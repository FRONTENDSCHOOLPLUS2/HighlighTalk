'use client';

import { useModalStore } from '@/store/ModalStore';
import Modal from '../Modal/Modal';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './_ModalTrigger.scss';

// NOTE - 회원가입 축하 코인 지급 안내 모달
function ModalTrigger({ isNewUser }: { isNewUser: string | undefined }) {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [cookieDeleted, setCookieDeleted] = useState(false);
  const router = useRouter();

  // console.log('useEffect 실행, isNewUser>', isNewUser);

  useEffect(() => {
    // Check if the cookie for the user is present
    const cookie = getCookie(isNewUser as string);

    if (isNewUser && cookie && !cookieDeleted) {
      openModal();
    }
  }, [isNewUser, cookieDeleted, openModal]);

  const handleCloseModal = () => {
    if (isNewUser) {
      deleteCookie(isNewUser);
      setCookieDeleted(true);
    }
    closeModal();
  };

  const handleGoTestButton = () => {
    if (isNewUser) {
      deleteCookie(isNewUser);
      setCookieDeleted(true);
    }
    closeModal();
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
export default ModalTrigger;
