'use client';

import './_KakaoShareButton.scss';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoShareButton() {
  const handleKakaoShare = () => {
    const { Kakao } = window;

    if (Kakao.isInitialized()) {
      Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
        templateArgs: {
          // TODO: 결과보기 버튼 눌렀을 때 현재 페이지 params 전달하도록 수정
          // TODO: 추후 로그인한 유저 이름가져오게 변경
          user_name: '다희',
        },
      });
    }
  };

  return (
    <button
      className="button-share-kakao"
      type="button"
      onClick={() => {
        handleKakaoShare();
        alert('kakao');
      }}
    >
      카카오톡으로 공유하기
    </button>
  );
}

export default KakaoShareButton;
