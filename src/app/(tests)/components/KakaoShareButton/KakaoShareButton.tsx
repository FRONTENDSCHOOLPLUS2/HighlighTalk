'use client';

import { useSession } from '@/app/providers';
import './_KakaoShareButton.scss';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoShareButton() {
  const session = useSession();
  const name = session?.user?.name;

  const handleKakaoShare = () => {
    const { Kakao } = window;
    const path = location.pathname + location.search;

    if (Kakao.isInitialized()) {
      Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
        templateArgs: {
          user_name: name || '나',
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
