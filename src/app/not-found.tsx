'use client';

import '../styles/not-found.css';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="error-wrapper ">
      <h2>🚧 앗, 무언가 잘못됐네요!</h2>
      <h3>요청하신 페이지를 찾을 수 없습니다.</h3>
      <Link href="/">⚙️ 홈으로 돌아가기</Link>
    </div>
  );
}
