import CoinNotice from '@/components/Coin/CoinNotice/CoinNotice';
import './_ChargePage.scss';
import CoinTabs from '@/components/Coin/CoinTabs/CoinTabs';

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
