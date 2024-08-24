'use client';
import { useEffect, useState } from 'react';
import { fetchOrderData } from '@/serverActions/orderAction';
import { OrderDataType } from '@/types/order';
import TransactionItem from './TransactionItem';
import './_CoinUsageHistory.scss';
import NoHistoryFound from './NoHistoryFound';

function CoinUsageHistory() {
  const [orders, setOrders] = useState<OrderDataType[]>([]);
  const [activeMenu, setActiveMenu] = useState('all');

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

    fetchData();
  }, []);

  return (
    <div className="coin-history-container">
      {orders && orders.length > 0 ? (
        <>
          <ul className="transaction-filter">
            <li>
              <button className={`all active`}>전체</button>
            </li>
            <li>
              <button className={`charge`}>충전</button>
            </li>
            <li>
              <button className={`use`}>사용</button>
            </li>
          </ul>
          <ul className="transactions-list">
            {orders.map((order, index) => (
              <TransactionItem order={order} key={index} index={index} />
            ))}
          </ul>
        </>
      ) : (
        <NoHistoryFound />
      )}
    </div>
  );
}

export default CoinUsageHistory;
