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
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session === null) {
          openModal();
        } else {
          setCurrentSession(session);
          setSessionChecked(true);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
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
      {isOpen && (
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
      {sessionChecked && children} {/* 인증된 경우에만 자식 컴포넌트 렌더링 */}
    </>
  );
}

export default ProtectedRoute;
