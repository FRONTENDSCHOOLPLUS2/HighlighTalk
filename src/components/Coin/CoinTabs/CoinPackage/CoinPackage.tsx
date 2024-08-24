import { Session } from 'next-auth';
import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import { updateCoinData } from '@/serverActions/coinAction';
import { createOrderData } from '@/serverActions/orderAction';
import { useSession } from '@/app/providers';
import { OrderDataType, OrderInfoType, UserPayDataType } from '@/types/order';
import { Coin } from '@public/image';
import Button from '@/components/Button/Button';

const STORE_CODE = process.env.NEXT_PUBLIC_PORTONE_SHOP_ID ?? '';

const COIN_PACKAGE = [
  { coin: 10, amount: 100 },
  { coin: 100, amount: 1000 },
  { coin: 200, amount: 2000 },
  { coin: 300, amount: 3000 },
  { coin: 500, amount: 5000 },
  { coin: 1000, amount: 10000 },
  { coin: 2000, amount: 20000 },
];

function CoinPackage() {
  const session = useSession();
  const userCoin = session?.user?.coin!;

  console.log('유저코인 이거임', userCoin);

  const generatePayDataOption = (userPayData: UserPayDataType) => {
    const data: RequestPayParams = {
      pg: 'kakaopay',
      pay_method: 'card', //생략 가능
      merchant_uid: userPayData.order_uid,
      name: '하이라이톡 | 코인 충전하기',
      amount: userPayData.amount,
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

  const handlePayment = (session: Session | null, amount: number) => {
    if (session === null) {
      return;
    }

    const randomNumber = Math.random();
    const randomOrderNum = randomNumber.toFixed(5);

    const UserPayData: UserPayDataType = {
      username: session.user?.name!,
      name: '결제 이름임', // ????
      email: session.user?.email!,
      amount: amount, // 결제금액
      order_uid: `ht_order_no_${randomOrderNum}`,
    };

    const userCoin = session.user?.coin!;

    if (typeof window !== 'undefined') {
      const { IMP } = window;
      IMP?.init(STORE_CODE);
      IMP?.request_pay(generatePayDataOption(UserPayData), (response) =>
        callback(response, userCoin)
      );
    }
  };

  const callback = async (response: RequestPayResponse, userCoin: number) => {
    console.log('💸 결제 RESPONSE >>> ', response);
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');
      console.log(success);

      // 10원 = 1코인으로 환산
      const calculatedCoins = response.paid_amount! / 10;
      const updatedUserCoin = userCoin + calculatedCoins;

      const orderData: OrderInfoType = {
        order_type: 'charge',
        amount: response.paid_amount, // 실제 결제 금액
        coin_amount: calculatedCoins, // 충전된 코인
        payment_method: response.pg_provider,
        extra: {
          balance_before: userCoin,
          balance_after: updatedUserCoin,
        },
      };

      const userId = session?.user?.id!;
      await updateCoinData(userId, updatedUserCoin);
      await createOrderData('charge', orderData);
    } else {
      alert(`결제 실패 ${error_msg}`);
    }
  };

  return (
    <ul className="contents">
      {COIN_PACKAGE.map((item, index) => (
        <li key={index}>
          <div className="left-content">
            <Coin />
            <p>
              코인<b>{item.coin}</b>개
            </p>
          </div>
          <Button
            theme="primary"
            styleType="tonal"
            onClick={() => handlePayment(session, item.amount)}
          >
            {item.amount.toLocaleString()}&nbsp;원
          </Button>
        </li>
      ))}
    </ul>
  );
}
export default CoinPackage;
