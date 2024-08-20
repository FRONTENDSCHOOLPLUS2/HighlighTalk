'use client';

import Button from '@/components/Button/Button';
import './_CoinCharge.scss';
import { RequestPayParams, RequestPayResponse } from '@/types/portone';

interface UserPayDataType {
  username: string; //유저명
  name: string; // 결제이름
  amount: number; // 결제 금액
  order_uid: string; //상점에서 생성한 고유 주문번호
}

const PG = ['kakaopay', 'tosspayments'];
const MID = process.env.NEXT_PUBLIC_PORTONE_MERCHANT_ID;
const STORE_CODE = process.env.NEXT_PUBLIC_PORTONE_SHOP_ID ?? '';

const dummyPayData: UserPayDataType = {
  username: '김설하',
  name: '결제 이름임',
  amount: 500, //500원 결제 넣어봄
  order_uid: 'order_3no_11413', //상점에서 생성한 고유 주문번호
};

// NOTE - 유저의 기본 정보를 통해 Option 생성
const generatePayDataOption = (userPayData: UserPayDataType) => {
  const data: RequestPayParams = {
    pg: 'tosspayments',
    merchant_uid: userPayData.order_uid,
    name: userPayData.name,
    pay_method: 'card',
    escrow: false,
    amount: userPayData.amount,
    buyer_name: userPayData.username,
    buyer_email: 'buyer@example.com',
    buyer_tel: '02-1670-5176',
    m_redirect_url: 'https://helloworld.com/payments/result', // 모바일 환경에서 필수 입력
    notice_url: 'https://helloworld.com/api/v1/payments/notice',
    confirm_url: 'https://helloworld.com/api/v1/payments/confirm',
    currency: 'KRW',
    locale: 'ko',
    custom_data: { getCoin: userPayData.amount / 100 },
    display: { card_quota: [0, 6] },
  };
  // {
  //   pg: `html5_inicis.INIpayTest`,
  //   pay_method: 'card',
  //   merchant_uid: userPayData.order_uid,
  //   name: userPayData.name,
  //   amount: userPayData.amount,
  //   buyer_email: 'test@portone.io',
  //   buyer_name: userPayData.username,
  //   buyer_tel: '010-1234-5678', //필수 파라미터 입니다.
  //   m_redirect_url: '{모바일에서 결제 완료 후 리디렉션 될 URL}',
  //   escrow: true,
  //   bypass: {
  //     acceptmethod: 'noeasypay',
  //     P_RESERVED: 'noeasypay=Y',
  //   },
  // };

  return data;
};

export const handlePayment = (PG?: string, MID?: string) => {
  if (typeof window !== 'undefined') {
    const { IMP } = window;
    IMP?.init(STORE_CODE);
    IMP?.request_pay(generatePayDataOption(dummyPayData), callback);
  }
};

const callback = (response: RequestPayResponse) => {
  console.log('결제 레스빤스', response);
  const { success, error_msg } = response;
  if (success) {
    alert('결제 성공');
    console.log(success);
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
            <Button onClick={() => handlePayment()}>500원</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CoinCharge;
