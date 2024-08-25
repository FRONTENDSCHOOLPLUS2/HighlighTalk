import Link from 'next/link';
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
              <dd>결제 상세내역은 코인 충전 페이지&gt;충전/사용 내역 메뉴에서 확인 가능합니다.</dd>
              <dd>충전한 코인을 사용하여 유료 분석을 열람할 수 있습니다.</dd>
              <dd>
                코인 환불이나 결제상의 에러 사항에 관련된 내용은 게시판에 남겨주시거나 메일을 통해
                연락 주시면 빠르게 해결해 드리겠습니다.
              </dd>
            </dl>
          </li>
          <li className="notice-info">
            <dl>
              {/* NOTE - 테스트모드 결제 안내사항 추가 */}
              <dt className="notice-title">구매취소</dt>
              <dd>테스트모드 결제가 진행됩니다.</dd>
              <dd>
                카카오페이는 실 결제가 진행되지 않으며, 일반 결제(KG이니시스)는 결제 승인 문자를
                받으실 수 있으나 매일 자정 전 (23:00~23:50) 에 자동적으로 일괄 취소됩니다.
              </dd>
              <dd>
                테스트 모드 결제에 관해 자세한 내용은&nbsp;
                <Link
                  href="https://guide.portone.io/9fb1462e-94b1-4d1f-86fb-66262306e066"
                  target="_blank"
                >
                  PortOne Guide
                </Link>
                를 참고해주세요.
              </dd>
              <dd>실제 출금은 이루어지지 않지만 코인은 정상적으로 충전됩니다.</dd>
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
