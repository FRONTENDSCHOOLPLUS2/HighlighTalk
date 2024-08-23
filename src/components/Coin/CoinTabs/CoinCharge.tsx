'use client';

import Button from '@/components/Button/Button';
import './_CoinCharge.scss';
import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import { UpdateSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { updateCoinData } from '@/serverActions/coinAction';
import { useCoinActions } from '@/hooks/useCoinAction';
import { createOrderData } from '@/serverActions/orderAction';

interface CoinChargePropType {
  updateSession: UpdateSession;
  userData: Session | null;
}
interface UserPayDataType {
  username: string; //유저명
  name: string; // 결제이름
  email: string;
  amount: number; // 결제 금액
  order_uid: string; //상점에서 생성한 고유 주문번호
}

export interface OrderDataType {
  order_type: 'charge' | 'purchase';
  amount: number | undefined;
  payment_method: string | undefined;
  extra: {
    balance_before: number;
    balance_after: number;
  };
}

const PG = ['kakaopay', 'tosspayments'];
const MID = process.env.NEXT_PUBLIC_PORTONE_MERCHANT_ID;
const STORE_CODE = process.env.NEXT_PUBLIC_PORTONE_SHOP_ID ?? '';

//FIXME - 임시로 난수 생성중
const randomNumber = Math.random();
const randomOrderNum = randomNumber.toFixed(5);

const dummyPayData: UserPayDataType = {
  username: '김설하',
  name: '결제 이름임',
  email: 'tmuchtalker@gmail.com',
  amount: 500, //500원 결제 넣어봄
  order_uid: `or3der_3no_${randomOrderNum}`, //상점에서 생성한 고유 주문번
};

function CoinCharge({ updateSession, userData }: CoinChargePropType) {
  const { updateCoin } = useCoinActions();
  const userCoin = userData?.coin || 0;

  // NOTE - 유저의 기본 정보를 통해 Option 생성

  const generatePayDataOption = (userPayData: UserPayDataType) => {
    const data: RequestPayParams = {
      pg: 'kakaopay',
      pay_method: 'card', //생략 가능
      merchant_uid: userPayData.order_uid,
      name: '주문명:결제테스트',
      amount: 1000,
      buyer_email: userPayData.email,
      buyer_name: userPayData.username,
      buyer_tel: '010-1234-5678',
    };
    // 옵션2) 이니시스
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

  const handlePayment = (PG?: string, MID?: string) => {
    if (typeof window !== 'undefined') {
      const { IMP } = window;
      IMP?.init(STORE_CODE);
      IMP?.request_pay(generatePayDataOption(dummyPayData), callback);
    }
  };

  const callback = async (response: RequestPayResponse) => {
    console.log('결제 레스빤스', response);
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');
      console.log(success);

      // 100원 = 1코인으로 환산, 유저 코인 데이터 업데이트하기 🅾️
      const calculatedCoins = response.paid_amount! / 10;
      const updatedUserCoin = calculatedCoins + userCoin;

      // TODO 결제 내역 데이터 생성 🅾️ DB에 보내기 >>

      const orderData: OrderDataType = {
        order_type: 'charge',
        amount: response.paid_amount,
        payment_method: response.pg_provider,
        extra: {
          balance_before: userCoin,
          balance_after: userCoin + calculatedCoins,
        },
      };

      // 세션의 coin 정보 업데이트 🅾️ / coin 정보 업데이트 DB에 보내기

      updateSession({ coin: userCoin + calculatedCoins });
      await updateCoinData('1', updatedUserCoin);

      await createOrderData('charge', orderData);
    } else {
      alert(`결제 실패 ${error_msg}`);
    }
  };

  // NOTE - PATCH함수 테스트용, 추후 제거

  const handleTestBtnClick = async () => {
    try {
      // console.log('코인 업데이트');
      // updateCoin('1', 20000);

      const dummyData: OrderDataType = {
        order_type: 'charge',
        amount: 3214,
        payment_method: '테스트중임',
        extra: {
          balance_before: 1,
          balance_after: 2,
        },
      };

      createOrderData('charge', dummyData);
    } catch (error) {
      console.error('DB_ 정보 업데이트 실패', error);
    }

    // TODO - 하나의 함수로 묶어서 데이터 무결성 유지하기
  };
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
            <button onClick={() => handleTestBtnClick()}>주문 데이터</button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CoinCharge;
