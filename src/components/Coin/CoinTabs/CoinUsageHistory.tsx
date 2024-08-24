'use client';
import { useEffect, useState } from 'react';

import { fetchOrderData } from '@/serverActions/orderAction';
import { OrderDataType } from '@/types/order';

// TODO - order 컬렉션 불러오기

function CoinUsageHistory() {
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchOrderData();
        console.log('fetchOrderData', data);

        const orderArr: OrderDataType[] = [];
        data.item.map((v) =>
          orderArr.push({
            ...v.order_info,
            createdAt: v.createdAt,
          })
        );

        setOrders(orderArr);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }

    fetchData(); // 데이터 가져오기 함수 호출
  }, []);

  return (
    <div>
      <div>g하이</div>
      {orders &&
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order_type: {order.order_type}</h3>
            <p>결제수단: {order.payment_method} </p>
            <p>전: {order.extra.balance_before} </p>
            <p>후: {order.extra.balance_after} </p>
            <p>거래일: {order.createdAt}</p>
          </div>
        ))}
    </div>
  );
}

export default CoinUsageHistory;
