import Button from '@/components/Button/Button';
import './_ProductPayModalContents.scss';
import './_ChargeModalContents.scss';
import { useState } from 'react';

interface ProductPayModalContentsPropType {
  test: any;
  coin: number | undefined;
  closeModal: any;
  handlePayButton: any;
}

function NoCoinContent() {
  return <div>앗, 코인이 부족해요</div>;
}

// NOTE - 유료 컨텐츠의 인트로 페이지에서 결제 진행을 위해 쓰이는 모달입니다.
function ProductPayModalContents({
  test,
  coin,
  closeModal,
  handlePayButton,
}: ProductPayModalContentsPropType) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="paymodal-container">
      <p className="amount">{test.title}</p>
      <p>
        <strong>{`${test.price.toLocaleString()}`}&nbsp;</strong>코인이 차감됩니다.
      </p>
      <div>
        현재 보유 코인 <strong>{coin}</strong>개
      </div>
      <label className="agreement">
        <input type="checkbox" onChange={handleCheckboxChange} />
        결제 내용을 확인했으며, 동의합니다.
      </label>

      <div className="modal-btns">
        <Button onClick={() => closeModal()} theme="secondary" styleType="outlined">
          닫기
        </Button>
        <Button onClick={() => console.log('클릭')} theme="secondary" disabled={!isChecked}>
          결제하기
        </Button>
        {/* <Button onClick={() => console.log('클릭')} theme="secondary">
          코인 충전하러 가기
        </Button> */}
      </div>
    </div>
  );
}
export default ProductPayModalContents;
