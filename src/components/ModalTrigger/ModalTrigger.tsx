'use client';

import { useModalStore } from '@/store/ModalStore';
import Modal from '../Modal/Modal';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';

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
      deleteCookie(isNewUser); // Delete the cookie
      setCookieDeleted(true); // Update state to reflect the deletion
    }
    closeModal(); // Close the modal
  };

  const handleGoTestButton = () => {
    if (isNewUser) {
      deleteCookie(isNewUser);
    }
    router.push('/freetest');
    closeModal();
  };
  return (
    // FIXME - UX에 적합하게 수정 필요
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="🎉 회원가입을 축하합니다!"
          content="가입 축하 100 코인이 지급되었어요."
          buttons={[
            {
              label: '지금 바로 분석하러 가기',
              onClick: () => handleGoTestButton(),
              theme: 'secondary',
            },
            {
              label: `닫기`,
              onClick: () => handleCloseModal(),
              theme: 'black',
              // styleType: 'tonal',
            },
          ]}
        >
          {/* <Button onClick={() => router.push('/freetest')} theme="secondary">
            지금 바로 분석하러 가기
          </Button>
          <Button onClick={() => handleCloseModal()} theme="secondary" styleType="outlined">
            닫기
          </Button> */}
        </Modal>
      )}
    </>
  );
}
export default ModalTrigger;
