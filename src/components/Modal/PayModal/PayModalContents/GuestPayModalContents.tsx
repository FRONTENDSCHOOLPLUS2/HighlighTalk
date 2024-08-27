import Modal from '../../Modal';

interface GuestPayModalContentsPropType {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleGoLoginButton: () => void;
}

// NOTE - 유료 컨텐츠의 인트로 페이지에서 게스트가 시작하기를 눌렀을 때 보여주는 모달 컨텐츠입니다.
function GuestPayModalContents({
  isOpen,
  handleCloseModal,
  handleGoLoginButton,
}: GuestPayModalContentsPropType) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="회원 전용 콘텐츠입니다."
        content="로그인 후 이용해주세요!"
        buttons={[
          { label: '로그인하기', onClick: () => handleGoLoginButton(), theme: 'secondary' },
          { label: `닫기`, onClick: () => handleCloseModal(), theme: 'black' },
        ]}
      ></Modal>
    </div>
  );
}
export default GuestPayModalContents;
