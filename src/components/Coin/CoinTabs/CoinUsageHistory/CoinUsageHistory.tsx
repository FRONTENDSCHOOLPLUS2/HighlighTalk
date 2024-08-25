'use client';
import { Suspense, lazy, useEffect, useState } from 'react';
import { fetchOrderData } from '@/serverActions/orderAction';
import { OrderDataType } from '@/types/order';
import { LoadingSpinner } from '@/components/Spinner/Spinner';
import NoHistoryFound from './NoHistoryFound';
import './_CoinUsageHistory.scss';

const TransactionItem = lazy(() => import('./TransactionItem'));

function CoinUsageHistory() {
  const [orders, setOrders] = useState<OrderDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchOrderData();
        console.log('fetchOrderData', data);

        const orderArr: OrderDataType[] = data.item.map((v) => ({
          ...v.order_info,
          createdAt: v.createdAt,
        }));

        setOrders(orderArr);
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredOrders = orders.filter((order) => {
    if (activeMenu === 'all') return true;
    return order.order_type === activeMenu;
  });

  return (
    <div className="coin-history-container">
      <ul className="transaction-filter">
        <li>
          <button
            className={`all ${activeMenu === 'all' ? 'active' : ''}`}
            onClick={() => setActiveMenu('all')}
          >
            전체
          </button>
        </li>
        <li>
          <button
            className={`charge ${activeMenu === 'charge' ? 'active' : ''}`}
            onClick={() => setActiveMenu('charge')}
          >
            충전
          </button>
        </li>
        <li>
          <button
            className={`use ${activeMenu === 'use' ? 'active' : ''}`}
            onClick={() => setActiveMenu('use')}
          >
            사용
          </button>
        </li>
      </ul>
      <ul className="transactions-list">
        {filteredOrders.length > 0 ? (
          <Suspense fallback={<p>Loading transactions...</p>}>
            {filteredOrders.map((order, index) => (
              <TransactionItem order={order} key={index} index={index} />
            ))}
          </Suspense>
        ) : (
          <NoHistoryFound />
        )}
      </ul>
    </div>
  );
}

export default CoinUsageHistory;
