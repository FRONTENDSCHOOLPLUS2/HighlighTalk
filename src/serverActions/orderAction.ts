'use server';

import { auth } from '@/auth';
import { OrderInfoType, OrderResponseData } from '@/types/order';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// TODO - 결제 내역 읽어오기 extra 객체 안에 있음
// return Data any 잡기
export async function fetchOrderData(): Promise<OrderResponseData> {
  const session = await auth();

  const res = await fetch(`${API_SERVER}/orders/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data = await res.json();
  console.log('fetchOrderData', data);
  return data;
}

// TODO - 결제 내역 생성
// DB 활용하면서 static한 부분은 안에 작성, 동적인 부분만 받아오도록

export async function createOrderData(orderType: 'pay' | 'charge', orderData: OrderInfoType) {
  const orderTypeNum = orderType === 'charge' ? 1 : 2;

  const bodyData = {
    products: [
      {
        _id: orderTypeNum,
        quantity: 1,
      },
    ],

    order_info: { ...orderData },
  };

  const session = await auth();

  const res = await fetch(`${API_SERVER}/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(bodyData),
  });

  const data = await res.json();
  console.log('updateCoinData', data);
  return data;
}
