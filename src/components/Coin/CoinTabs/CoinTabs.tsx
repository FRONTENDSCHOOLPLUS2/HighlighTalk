'use client';

import './_CoinTabs.scss';
import Button from '@/components/Button/Button';
import CoinCharge from './CoinCharge';
import CoinUsageHistory from './CoinUsageHistory';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const TABS = {
  CHARGE: 'charge',
  HISTORY: 'history',
};

function CoinTabs() {
  const { data, update } = useSession();
  const userCoin = data?.coin || 0;
  const [activeTab, setActiveTab] = useState(TABS.CHARGE);

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.HISTORY:
        return <CoinUsageHistory />;
      case TABS.CHARGE:
      default:
        return <CoinCharge updateSession={update} userData={data} />;
    }
  };

  return (
    <>
      <article className="user-coin-container">
        <h2>유저 코인 보유 정보</h2>
        <div className="left-content">
          <span className="coin">보유 코인</span>
          <b>{userCoin}</b>
          <span>개</span>
        </div>
        <div className="right-content">
          <span className="description">코인 충전하고 더 많은 분석을 받아 보세요!</span>
          <Button onClick={() => setActiveTab('charge')}>결제하기</Button>
        </div>
      </article>

      <div className="coin-tabs-container">
        <div className="tab-header">
          <button
            onClick={() => setActiveTab(TABS.CHARGE)}
            className={activeTab === TABS.CHARGE ? 'active' : ''}
          >
            코인충전
          </button>
          <button
            onClick={() => setActiveTab(TABS.HISTORY)}
            className={activeTab === TABS.HISTORY ? 'active' : ''}
          >
            충전/사용내역
          </button>
        </div>
        <section className="tab-contents">{renderTabContent()}</section>
      </div>
    </>
  );
}
export default CoinTabs;
