import CoinNotice from '@/components/Coin/CoinNotice/CoinNotice';
import './_ChargePage.scss';
import CoinTabs from '@/components/Coin/CoinTabs/CoinTabs';

export const metadata = {
  title: '하이라이톡 | 코인 충전 페이지',
  description: '하이라이톡 에서 AI기반 톡방 분석 서비스를 받아 보세요',
  keywords: 'highlightalk',
};

function ChargePage() {
  return (
    <div className="charge-page-container">
      <h2>코인 충전 페이지</h2>
      <CoinTabs />
      <CoinNotice />
    </div>
  );
}
export default ChargePage;
