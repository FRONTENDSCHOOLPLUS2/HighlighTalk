'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { OrderDataType } from './CoinCharge';

// TODO - order 컬렉션 불러오기

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

function CoinUsageHistory() {
  const session = useSession();
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`${API_SERVER}/orders/`, {
          headers: {
            'client-id': `${CLIENT_ID}`,
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        });
        const result = await response.json();
        const resultItem = result.item;
        console.log(resultItem, '<- result Item ');

        let orderItem: OrderDataType[] = [];
        resultItem.map((v: any) => orderItem.push(v.order_info));

        console.log(orderItem, 'orderItem');
        if (result.ok) {
          setOrders(orderItem);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderData();
  }, [CLIENT_ID]);

  return (
    <div>
      {orders &&
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order_type: {order.order_type}</h3>
            <p>결제수단: {order.payment_method} </p>
            <p>전: {order.extra.balance_before} </p>
            <p>후: {order.extra.balance_after} </p>
          </div>
        ))}
    </div>
  );
}

export default CoinUsageHistory;
