import './_CoinCharge.scss';
import CoinPackage from './CoinPackage/CoinPackage';

function CoinCharge() {
  return (
    <div className="coin-charge-container">
      <section className="description">
        <h3>코인이란?</h3>
        <div className="">
          <p>유료 테마 분석을 위해 필요한 전용 결제수단입니다.</p>
        </div>
      </section>
      <section className="coin-package">
        <h3>코인 패키지</h3>
        <div className="package-list">
          <CoinPackage />
        </div>
      </section>
    </div>
  );
}
export default CoinCharge;
