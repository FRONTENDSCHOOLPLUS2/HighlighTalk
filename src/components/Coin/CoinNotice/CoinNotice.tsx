import './_CoinNotice.scss';

function CoinNotice() {
  return (
    <div className="coin-notice-container">
      <div className="contents">
        <ul>
          <li className="notice-info">
            <dl>
              <dt className="notice-title">코인 이용안내</dt>
              <dd>코인 구매에 대해서는 부가가치세가 부과되지 않습니다.</dd>
              <dd>코인 구매 시 추가 지급되는 무료코인 수량은 변경될 수 있습니다.</dd>
              <dd>결제 상세내역은 마이페이지/결제내역 메뉴에서 확인 가능합니다.</dd>
              <dd>충전한 코인을 사용하여 유료 분석을 열람할 수 있습니다.</dd>
            </dl>
          </li>
          <li className="notice-info">
            <dl>
              <dt className="notice-title">구매취소</dt>
              <dd>
                무료코인은 구매 취소 및 환불 대상이 아닙니다. 따라서 충전 내역과 취소 내역의 수량이
                다를 수 있습니다.
              </dd>
              <dd>
                무료코인은 구매 취소 및 환불 대상이 아닙니다. 따라서 충전 내역과 취소 내역의 수량이
                다를 수 있습니다.
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default CoinNotice;
