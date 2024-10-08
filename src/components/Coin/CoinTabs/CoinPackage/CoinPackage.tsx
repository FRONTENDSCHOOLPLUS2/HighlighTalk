import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { RequestPayParams, RequestPayResponse } from '@/types/portone';
import { updateCoinData } from '@/serverActions/coinAction';
import { createOrderData } from '@/serverActions/orderAction';
import { useSession } from '@/app/providers';
import { OrderInfoType, UserPayDataType } from '@/types/order';
import { Coin } from '@public/image';
import Button from '@/components/Button/Button';
import { useModalStore } from '@/store/ModalStore';
import PayModal from '@/components/Modal/PayModal/PayModal';
import ChargeModalContents from '@/components/Modal/PayModal/PayModalContents/ChargeModalContents';

const STORE_CODE = process.env.NEXT_PUBLIC_PORTONE_SHOP_ID ?? '';

// NOTE - 100원에 1코인으로 환산

const COIN_PACKAGE = [
  { coin: 1, amount: 100 },
  { coin: 10, amount: 1000 },
  { coin: 20, amount: 2000 },
  { coin: 30, amount: 3000 },
  { coin: 50, amount: 5000 },
  { coin: 100, amount: 10000 },
  { coin: 200, amount: 20000 },
];

function CoinPackage() {
  const session = useSession();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('kakaopay');
  const { isOpen, openModal, closeModal } = useModalStore();

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // 화면이 렌더링 된 후에 isRendered를 true로
    setIsRendered(true);
  }, []);

  const generatePayDataOption = (userPayData: UserPayDataType) => {
    const data: RequestPayParams = {
      pg: paymentMethod,
      pay_method: 'card', //생략 가능
      merchant_uid: userPayData.order_uid,
      name: '하이라이톡 | 코인 충전하기',
      amount: userPayData.amount,
      buyer_email: userPayData.email,
      buyer_name: userPayData.username,
      buyer_tel: '010-1234-5678',
    };
    return data;
  };

  // 결제 수단 변경 함수
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = (session: Session | null, amount: number) => {
    if (session === null) {
      return;
    }

    const randomNumber = Math.random();
    const randomOrderNum = randomNumber.toFixed(5);

    const UserPayData: UserPayDataType = {
      username: session.user?.name!,
      name: '하이라이톡 | 코인 충전',
      email: session.user?.email!,
      amount: amount, // 결제금액
      order_uid: `ht_order_no_${randomOrderNum}`,
    };

    const userCoin = session.user?.coin!;

    if (typeof window !== 'undefined') {
      const { IMP } = window;
      IMP?.init(STORE_CODE);

      const payDataOption = generatePayDataOption(UserPayData);

      IMP?.request_pay(payDataOption, (response) => callback(response, userCoin));
    }
  };

  const callback = async (response: RequestPayResponse, userCoin: number) => {
    // console.log('💸 결제 RESPONSE >>> ', response);
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');

      const calculatedCoins = response.paid_amount! / 100;
      const updatedUserCoin = userCoin + calculatedCoins;

      const orderData: OrderInfoType = {
        order_type: 'charge',
        amount: response.paid_amount,
        coin_amount: calculatedCoins,
        payment_method: response.pg_provider,
        extra: {
          balance_before: userCoin,
          balance_after: updatedUserCoin,
        },
      };

      const userId = session?.user?.id!;
      await updateCoinData(userId, updatedUserCoin);
      await createOrderData('charge', orderData);

      closeModal();
      window.location.reload();
    } else {
      alert(`결제 실패 ${error_msg}`);
    }
  };

  return (
    <>
      <ul className="contents">
        {isRendered && (
          <ul className="contents">
            {COIN_PACKAGE.map((item, index) => (
              <li key={index}>
                <div className="left-content">
                  <Coin />
                  <p>
                    코인<b>{item.coin}</b>개
                  </p>
                </div>
                <div className="charge-button">
                  <Button
                    theme="primary"
                    styleType="tonal"
                    size="full"
                    onClick={() => {
                      setSelectedAmount(item.amount);
                      openModal();
                    }}
                    style={{ fontWeight: 600, fontSize: '1.4rem' }}
                  >
                    {item.amount.toLocaleString()}&nbsp;원
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ul>
      {isOpen && (
        <PayModal
          isOpen={isOpen}
          onClose={closeModal}
          title={`${selectedAmount}원 결제 결제 수단을 선택해주세요`}
          session={session}
          amount={selectedAmount}
          content=""
          footer="결제 전 이용약관을 확인해주세요."
        >
          <ChargeModalContents
            selectedAmount={selectedAmount}
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
          />
          <div className="modal-btns">
            <Button onClick={() => handlePayment(session, selectedAmount)} theme="secondary">
              결제하기
            </Button>
            <Button onClick={() => closeModal()} theme="black">
              닫기
            </Button>
          </div>
        </PayModal>
      )}
    </>
  );
}
export default CoinPackage;
