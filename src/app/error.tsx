'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h3>{error.message}</h3>
      <p>이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요! 알 빠 노 </p>
    </div>
  );
}
