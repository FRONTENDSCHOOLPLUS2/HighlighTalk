'use client';

import Button from '@/components/Button/Button';
import './_CoinCharge.scss';
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
    <div className="coin-charge-container">
      <section className="description">
        <h3>코인이란?</h3>
        <div className="">
          <p>유료 테마 분석을 위해 필요한 전용 결제수단입니다.</p>
        </div>
      </section>
      <section className="coin-package">
        <h3>코인 패키지</h3>
        <div className="package-list">
          <div className="contents">
            <Button>충전하기</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CoinCharge;
