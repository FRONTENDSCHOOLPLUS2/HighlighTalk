import React from 'react';
import Button from '../Button/Button';
import './_Modal.scss';

interface ButtonProps {
  label: string;
  theme?: 'primary' | 'secondary' | 'black';
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  buttons?: ButtonProps[];
}

function Modal({
  isOpen,
  onClose,
  content,
  title,
  footer,
  children,
  className = '',
  buttons = [{ label: '닫기', onClick: onClose, theme: 'secondary' }],
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className={`modal ${className}`}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-icon"></div>
        <div className="modal-body">{content}</div>
        {children}
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <Button key={index} theme={button.theme || 'secondary'} onClick={button.onClick}>
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
