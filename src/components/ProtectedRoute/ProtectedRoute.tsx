'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

interface ProtectedRoutePropType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}

function ProtectedRoute({ setCurrentStep, children }: { setCurrentStep: any; children: any }) {
  // FIXME - 전역 상태로 리팩터링 이전의 모달 사용
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      openModal(); // 인증되지 않은 경우 모달 표시
    }
  }, [session, status]);

  const handleGoLoginButton = () => {
    router.push('/login');
  };

  const handleCloseModal = () => {
    closeModal();
    setCurrentStep(1);
  };

  if (status === 'loading') return null; // 로딩 중일 때는 아무것도 렌더링하지 않음

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} content="로그인 후 이용해보세요!">
          <Button theme="black" onClick={handleGoLoginButton}>
            로그인 하러 가기
          </Button>
        </Modal>
      )}
      {session && children} {/* 인증된 경우에만 자식 컴포넌트 렌더링 */}
    </>
  );
}

export default ProtectedRoute;
