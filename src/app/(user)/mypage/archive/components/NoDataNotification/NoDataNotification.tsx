'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import './_NoDataNotification.scss';

function NoDataNotification() {
  const router = useRouter();

  return (
    <div className="nodata-cont">
      <h2>아직 분석 데이터가 없어요.</h2>
      <p>AI 분석을 받고 이 곳에서 결과를 확인할 수 있어요.</p>
      <p>
        <Button
          onClick={() => {
            router.push('/');
          }}
          size="full"
          styleType="tonal"
          rounded
        >
          홈으로 가기
        </Button>
      </p>
    </div>
  );
}

export default NoDataNotification;
