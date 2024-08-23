'use server';

import { auth } from '@/auth';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// TODO - 결제 내역 읽어오기 extra 객체 안에 있음
export async function fetchOrderData() {
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
export async function createOrderData(orderType: string, orderData: any) {
  const orderTypeNum = orderType === 'pay' ? 1 : 2;

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
