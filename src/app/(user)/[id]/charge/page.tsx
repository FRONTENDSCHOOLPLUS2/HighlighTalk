'use client';

import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import Button from '@/components/Button/Button';
import './_ChargePage.scss';

const MID = process.env.NEXT_PUBLIC_PORTONE_MERCHANT_ID;

export const handlePayment = () => {
  if (typeof window !== 'undefined') {
    const { IMP } = window;
    IMP?.init('imp73170756'); // 고객사 식별코드

    // 결제 데이터 정의
    const data: RequestPayParams = {
      // pg: `kakaopay.TC0ONETIME`,
      pg: `kakaopay.${MID}`,
      pay_method: 'card',
      merchant_uid: 'test_lzyvmeco',
      name: '테스트 결제',
      amount: 100,
      buyer_tel: '010-0000-0000',
    };
    console.log('data', data);
    IMP?.request_pay(data, callback);
  }
};

const callback = (response: RequestPayResponse) => {
  const { success, error_msg } = response;
  if (success) {
    alert('결제 성공');
  } else {
    alert(`결제 실패 ${error_msg}`);
  }
};

function ChargePage() {
  return (
    <div className="charge-page-container">
      코인 충전 페이지
      <section>
        <div>
          <span>보유 코인</span>
          <span>0</span>개<span>코인 충전하고 더 많은 분석을 받아 보세요!</span>
          <Button onClick={() => handlePayment()}>결제하기</Button>
        </div>
      </section>
    </div>
  );
}
export default ChargePage;
