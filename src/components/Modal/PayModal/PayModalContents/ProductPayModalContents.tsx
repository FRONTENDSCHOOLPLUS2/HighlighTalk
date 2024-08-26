import Button from '@/components/Button/Button';
import './_PayModalContents.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductPayModalContentsPropType {
  test: any;
  coin: number | undefined;
  closeModal: any;
  handlePayButton: any;
}

// NOTE - 유료 컨텐츠의 인트로 페이지에서 결제 진행을 위해 쓰이는 모달입니다.
function ProductPayModalContents({
  test,
  coin = 0,
  closeModal,
  handlePayButton,
}: ProductPayModalContentsPropType) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const canPay = coin !== undefined && coin > test.price;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleGoChargeButton = async () => {
    closeModal();
    router.push('/freetest');
  };

  // NOTE - 코인 부족할 경우 렌더링할 내용
  const NoCoin = () => (
    <>
      <p className="amount">앗, 코인이 부족해요.</p>
      <p>
        <strong>{`${test.price.toLocaleString()}`}&nbsp;</strong>코인이 필요합니다.
      </p>
      <div>
        현재 보유 코인 <strong>{coin}</strong>개
      </div>
      <div className="modal-content-buttons">
        <Button onClick={() => closeModal()} theme="secondary" styleType="outlined">
          닫기
        </Button>
        <Button onClick={() => handleGoChargeButton()} theme="secondary">
          코인 충전하러 가기
        </Button>
      </div>
    </>
  );

  return (
    <div className="paymodal-container">
      {canPay ? (
        <>
          <p className="amount"> {test.title}</p>
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
          <div className="modal-content-buttons">
            <Button onClick={() => closeModal()} theme="secondary" styleType="outlined">
              닫기
            </Button>
            <Button onClick={() => handlePayButton()} theme="secondary" disabled={!isChecked}>
              결제하기
            </Button>
          </div>
        </>
      ) : (
        <NoCoin />
      )}
    </div>
  );
}
export default ProductPayModalContents;
