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
    const path = location.pathname + location.search;

    if (Kakao.isInitialized()) {
      Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
        templateArgs: {
          // TODO: 추후 로그인한 유저 이름가져오게 변경
          user_name: '다희',
          path: path,
        },
      });
    }
  };

  return (
    <button className="button-share-kakao" type="button" onClick={handleKakaoShare}>
      카카오톡으로 공유하기
    </button>
  );
}

export default KakaoShareButton;
