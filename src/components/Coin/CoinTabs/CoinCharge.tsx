'use client';

import { RequestPayParams, RequestPayResponse } from '@/types/portone';

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

function CoinCharge() {
  return (
    <div>
      <div className="description">
        <span>코인이란?</span>
        <span>유료 테마 분석을 위해 필요한 전용 결제수단입니다.</span>
      </div>
      <div className="coin-package">
        <span>코인 패키지</span>
        <button>충전하기</button>
      </div>
    </div>
  );
}
export default CoinCharge;
