import { CharacterGray } from '@public/image';
import './_CoinUsageHistory.scss';

function NoHistoryFound() {
  return (
    <div className="no-history-container">
      <div className="image">
        <CharacterGray />
      </div>
      <h3>거래 내역이 없어요!</h3>
    </div>
  );
}
export default NoHistoryFound;
