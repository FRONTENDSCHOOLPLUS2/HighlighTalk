'use client';

import './_ShareSection.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import KakaoShareButton from '../KakaoShareButton/KakaoShareButton';

declare global {
  interface Window {
    Kakao: any;
  }
}

function ShareSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 여는 함수
  const openModal = () => setIsModalOpen(true);
  // 모달을 닫는 함수
  const closeModal = () => setIsModalOpen(false);

  const handleButtonPress = () => {
    openModal();

    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_AUTH_KAKAO_ID);
    }
  };

  return (
    <section className="share">
      <h2 className="heading-2">결과 공유하기</h2>
      <p className="heading-desc">대화방 참여자들에게 분석 내용을 공유해 보세요!</p>
      <Button styleType="tonal" size="md" rounded onClick={handleButtonPress}>
        공유하기
      </Button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} content="친구들에게 결과를 공유해보세요!">
          <KakaoShareButton />
        </Modal>
      )}
      <div id="kakaotalk-sharing-btn"></div>
    </section>
  );
}

export default ShareSection;
