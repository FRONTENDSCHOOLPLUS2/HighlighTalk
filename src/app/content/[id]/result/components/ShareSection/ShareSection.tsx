'use client';

import './_ShareSection.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';

function ShareSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 여는 함수
  const openModal = () => setIsModalOpen(true);
  // 모달을 닫는 함수
  const closeModal = () => setIsModalOpen(false);

  const handleButtonPress = () => {
    openModal();
  };

  return (
    <section className="share">
      <h2 className="heading-2">결과 공유하기</h2>
      <p className="heading-desc">대화방 참여자들에게 분석 내용을 공유해 보세요!</p>
      <Button styleType="tonal" size="md" rounded onClick={handleButtonPress}>
        공유하기
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content="친구들에게 공유해보세요!"
          title="결과 공유하기"
          buttons={[{ label: '닫기', onClick: closeModal, theme: 'primary' }]}
        ></Modal>
      )}
    </section>
  );
}

export default ShareSection;
