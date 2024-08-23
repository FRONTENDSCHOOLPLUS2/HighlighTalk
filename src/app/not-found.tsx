'use client';

import '../styles/not-found.scss';
import Link from 'next/link';
import { poppinsFont } from '@/utils/font';

export default function Error() {
  return (
    <div className={`${poppinsFont.className}`}>
      <div className="notFound-wrapper">
        <div className="notFound-text">
          <h1>404</h1>
          <p className="text-p">앗, 찾을 수 없는 페이지 입니다.</p>
          <p className="text-p-r">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하신것 같아요</p>
          <span className="text-p-l">We can't seem to find the page you're looking for.</span>
          <Link href="/" className="tohome">
            ⚙️ 홈으로 돌아가기
          </Link>
        </div>
        <div className="notFound-image"></div>
      </div>
    </div>
  );
}
