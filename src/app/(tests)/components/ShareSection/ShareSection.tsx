'use client';

import './_ShareSection.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';
import { useModalStore } from '@/store/ModalStore';
import KakaoShareButton from '../KakaoShareButton/KakaoShareButton';
import { shareURL } from '@/utils/shareURL';

declare global {
  interface Window {
    Kakao: any;
  }
}

function ShareSection() {
  const { isOpen: isModalOpen, openModal, closeModal } = useModalStore();

  // 공유하기 모달 여는 버튼
  const handleButtonPress = () => {
    openModal();

    // 카카오 SDK Initailize
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_AUTH_KAKAO_ID);
    }
  };

  return (
    <section className="share">
      <TitleBox title={'결과 공유하기'} desc={'대화방 참여자들에게 분석 내용을 공유해 보세요!'} />
      <div className="cont-btn">
        <Button styleType="tonal" size="md" rounded onClick={handleButtonPress}>
          공유하기
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} content="친구들에게 결과를 공유해보세요!">
          <div className="list-btn">
            <button
              className="button-share"
              onClick={() => {
                shareURL('🤖AI 분석 결과가 도착했어요!');
              }}
            >
              URL로 공유하기
            </button>
            <KakaoShareButton />
          </div>
        </Modal>
      )}
      <div id="kakaotalk-sharing-btn"></div>
    </section>
  );
}

export default ShareSection;
