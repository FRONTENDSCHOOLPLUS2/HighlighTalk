import Button from '@/components/Button/Button';
import './_CoinCharge.scss';
import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import { UpdateSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { updateCoinData } from '@/serverActions/coinAction';
import { createOrderData } from '@/serverActions/orderAction';
import { useSession } from '@/app/providers';
import { OrderDataType, UserPayDataType } from '@/types/order';

//FIXME - 임시로 난수 생성중
const randomNumber = Math.random();
const randomOrderNum = randomNumber.toFixed(5);

const STORE_CODE = process.env.NEXT_PUBLIC_PORTONE_SHOP_ID ?? '';

const dummyPayData: UserPayDataType = {
  username: '김설하',
  name: '결제 이름임',
  email: 'tmuchtalker@gmail.com',
  amount: 500, //500원 결제 넣어봄
  order_uid: `or3der_3no_${randomOrderNum}`, //상점에서 생성한 고유 주문번호
};

function CoinPackage() {
  const session = useSession();
  const userCoin = session?.user?.coin!;

  console.log('유저코인 이거임', userCoin);

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

  const handlePayment = (coin: number) => {
    if (typeof window !== 'undefined') {
      const { IMP } = window;
      IMP?.init(STORE_CODE);
      IMP?.request_pay(generatePayDataOption(dummyPayData), (response) =>
        callback(response, userCoin)
      );
    }
  };

  const callback = async (response: RequestPayResponse, userCoin: number) => {
    console.log('결제 레스빤스', response);
    console.log(userCoin);
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');
      console.log(success);

      // 100원 = 1코인으로 환산, 유저 코인 데이터 업데이트하기 🅾️
      const calculatedCoins = response.paid_amount! / 10;
      const updatedUserCoin = calculatedCoins + userCoin;

      console.log('calculatedCoins>', calculatedCoins); // 🅾️
      console.log('updatedUserCoin>', updatedUserCoin); // Nan
      console.log('userCoin>', userCoin); //
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
    <div className="contents">
      <Button onClick={() => handlePayment(userCoin)}>500원</Button>
      <button onClick={() => handleTestBtnClick()}>주문 데이터</button>
      <button>테스트 버튼입니다2</button>
    </div>
  );
}
export default CoinPackage;
