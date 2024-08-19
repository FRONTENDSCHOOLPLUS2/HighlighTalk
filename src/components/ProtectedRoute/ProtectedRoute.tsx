'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

interface ProtectedRoutePropType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}

function ProtectedRoute({ setCurrentStep, children }: ProtectedRoutePropType) {
  // FIXME - 전역 상태로 리팩터링 이전의 모달 사용

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (session === null) {
        openModal();
      } else {
        setCurrentSession(session);
        setSessionChecked(true);
      }
    };
    checkSession();
  }, []);

  const handleGoLoginButton = () => {
    router.push('/login');
  };

  const handleCloseModal = () => {
    closeModal();
    setCurrentStep(1);
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} content="로그인 후 이용해보세요!">
          <Button theme="black" onClick={handleGoLoginButton}>
            로그인 하러 가기
          </Button>
        </Modal>
      )}
      {sessionChecked && children} {/* 인증된 경우에만 자식 컴포넌트 렌더링 */}
    </>
  );
}

export default ProtectedRoute;
