'use client';
import { poppinsFont } from '@/utils/font';
import '../styles/error.scss';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${poppinsFont.className}`}>
      <div className="notFound-wrapper">
        <div className="notFound-text">
          <h1>오류 메세지:</h1>
          <p className="text-p"> {error.message}</p>
          <p className="text-p-r">요청하신 내용을 처리하는 과정에서 오류가 발생했어요</p>
          <span className="text-p-l">We can't seem to find the request you're looking for.</span>
          <Link href="/" className="tohome">
            ⚙️ 홈으로 돌아가기
          </Link>
        </div>
        <div className="notFound-image"></div>
      </div>
    </div>
  );
}
