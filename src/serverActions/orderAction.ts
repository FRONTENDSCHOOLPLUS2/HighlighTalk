'use server';

import { auth, update } from '@/auth';
import { OrderInfoType, OrderResponseData } from '@/types/order';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// FIXME - extra 데이터는 함께 업데이트되어야 하는데, orderAction과 coinAction이 기능이 중복되는 부분이 있어 개선 필요

// NOTE - 유료 결제시 유저의 결제내역 리스트와 코인을 업데이트하는 액션
export async function updateUserOrderList(newOrderId: number) {
  const session = await auth();
  const userOrderList = session?.user?.orderList || [];

  const updatedOrderList = [...userOrderList, newOrderId];

  const bodyData = {
    extra: {
      coin: session?.user?.coin,
      orderList: updatedOrderList,
    },
  };

  const res = await fetch(`${API_SERVER}/users/${session?.user?.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(bodyData),
  });

  await update({
    user: {
      coin: session?.user?.coin,
      orderList: updatedOrderList,
    },
  });
}
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
