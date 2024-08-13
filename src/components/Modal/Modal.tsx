import React from 'react';
import Button from '../Button/Button';
import './_Modal.scss';

interface ButtonProps {
  label: string;
  theme?: string;
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  buttons?: ButtonProps[];
}

function Modal({
  isOpen,
  onClose,
  content = '파일이 업로드 됐습니다.', // 내용
  title,
  footer,
  className = '',
  buttons = [{ label: '닫기', onClick: onClose, theme: 'secondary' }],
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-icon"></div>
        <div className="modal-body">{content}</div>
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <Button
              key={index}
              theme={'secondary' || 'primary'}
              label={button.label}
              onClick={button.onClick}
            />
          ))}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;

// 사용 예시

//  <Modal
//    isOpen={isModalOpen}
//    onClose={closeModal}
//    content="확인을 누른 후 분석을 시작해요"
//    title="파일 업로드 성공"
//    buttons={[
//      { label: '닫기', onClick: closeModal, theme: 'primary' },
//      { label: '확인', onClick: openModal, theme: 'primary' },
//    ]}
//  />;

// const [isModalOpen, setIsModalOpen] = useState(false);

// // 모달을 여는 함수
// const openModal = () => setIsModalOpen(true);

// // 모달을 닫는 함수
// const closeModal = () => setIsModalOpen(false);
