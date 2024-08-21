'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Modal from '../Modal/Modal';
import { useModalStore } from '@/store/ModalStore';

interface ProtectedRoutePropType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}

function ProtectedRoute({ setCurrentStep, children }: ProtectedRoutePropType) {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [sessionChecked, setSessionChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (session === null) {
        openModal();
        setSessionChecked(false);
      } else {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, []);

  const handleGoLoginButton = () => {
    closeModal();
    router.push('/login');
  };

  const handleCloseModal = () => {
    closeModal();
    setCurrentStep(1);
  };

  return (
    <>
      {sessionChecked && (
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="회원 전용 콘텐츠입니다."
          content="로그인 후 이용해주세요!"
          buttons={[
            { label: '로그인하기', onClick: () => handleGoLoginButton(), theme: 'secondary' },
            { label: `닫기`, onClick: () => handleCloseModal(), theme: 'black' },
          ]}
        ></Modal>
      )}
      {children}
    </>
  );
}

export default ProtectedRoute;
