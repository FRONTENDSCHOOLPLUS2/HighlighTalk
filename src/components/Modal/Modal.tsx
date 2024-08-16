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
            <Button key={index} theme={'secondary' || 'primary'} onClick={button.onClick}>
              {button.label}
            </Button>
          ))}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
