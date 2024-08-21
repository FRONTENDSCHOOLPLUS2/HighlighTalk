'use client';

import { useUserStore } from '@/store/useUserStore';
import './_KakaoShareButton.scss';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoShareButton() {
  const user = useUserStore((state) => state.user);

  const handleKakaoShare = () => {
    const { Kakao } = window;
    const path = location.pathname + location.search;

    if (Kakao.isInitialized()) {
      Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
        templateArgs: {
          user_name: user.name || '나',
          path: path,
        },
      });
    }
  };

  return (
    <button className="button-share kakao" type="button" onClick={handleKakaoShare}>
      카카오톡으로 공유하기
    </button>
  );
}

export default KakaoShareButton;
