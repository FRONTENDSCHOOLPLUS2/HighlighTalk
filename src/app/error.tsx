'use client';
import { poppinsFont } from '@/utils/font';
import '../styles/error.scss';
import Button from '@/components/Button/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${poppinsFont.className}`}>
      <div className="notFound-wrapper">
        <div className="notFound-text">
          <h1>오류 메세지:</h1>
          <p className="text-p"> {error.message}</p>
          <p className="text-p-r">요청하신 내용을 처리하는 과정에서 오류가 발생했어요</p>
          <span className="text-p-l">We can't seem to find the request you're looking for.</span>
          <Button
            theme="secondary"
            onClick={() => {
              reset();
            }}
          >
            다시 시도하기
          </Button>
        </div>
        <div className="notFound-image"></div>
      </div>
    </div>
  );
}
