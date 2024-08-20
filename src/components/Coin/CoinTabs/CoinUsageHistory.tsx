'use client';
import Button from '@/components/Button/Button';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// TODO - order 컬렉션 불러오기

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

function CoinUsageHistory() {
  const session = useSession();
  const [orders, setOrders] = useState([]);

  // FIXME -  결제 목록 내역을 불러오는 함수 (500 Error)

  useEffect(() => {
    const getOrderList = async () => {
      try {
        const response = await fetch(`${API_SERVER}/orders/`, {
          headers: {
            'client-id': `${CLIENT_ID}`,
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        });

        const result = await response.json();
        console.log(result, '결과조회');

        if (response.ok) {
          setOrders(result.item);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getOrderList();
  }, [CLIENT_ID]);

  return <div>{/* // TODO - 결제내역 결과 뿌리기  */}</div>;
}

export default CoinUsageHistory;
