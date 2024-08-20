import Button from '@/components/Button/Button';
import Link from 'next/link';

interface CoinSummaryPropType {
  coin: number | undefined;
}

function CoinSummary({ coin = 0 }: CoinSummaryPropType) {
  return (
    <div className="contents coin">
      <div className="coin-box">
        <span className="coin-img"></span>
        보유 코인&nbsp;<b>{coin}</b>&nbsp;개
      </div>
      <Link href={`/charge`}>
        <Button theme="primary" size="full" rounded>
          코인 충전하기
        </Button>
      </Link>
    </div>
  );
}
export default CoinSummary;
