import './_PayModalContents.scss';

interface ChargeModalContentsPropType {
  selectedAmount: number;
  paymentMethod: any;
  handlePaymentMethodChange: any;
}

// NOTE - 코인 충전 > 결제 옵션 선택을 위해 열리는 모달입니다.
function ChargeModalContents({
  selectedAmount,
  paymentMethod,
  handlePaymentMethodChange,
}: ChargeModalContentsPropType) {
  return (
    <div className="paymodal-container">
      <div className="modal-description">
        <p className="amount">
          <strong>{`${selectedAmount.toLocaleString()}`}</strong>원 결제
        </p>
        <p>
          <strong>{selectedAmount / 100}</strong>&nbsp;코인이 충전됩니다.
        </p>
        <p>결제 수단을 선택해주세요.</p>
      </div>
      <div className="options">
        <label>
          <input
            type="radio"
            value="kakaopay"
            checked={paymentMethod === 'kakaopay'}
            onChange={handlePaymentMethodChange}
          />
          카카오페이
        </label>
        <label>
          <input
            type="radio"
            value="html5_inicis.INIpayTest"
            checked={paymentMethod === 'html5_inicis.INIpayTest'}
            onChange={handlePaymentMethodChange}
          />
          일반결제
        </label>
      </div>
    </div>
  );
}
export default ChargeModalContents;
