'use client';

import '../styles/not-found.css';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="error-wrapper ">
      <Link href="/">⚙️ 홈으로 돌아가기</Link>
    </div>
  );
}
