import React from 'react';
import Button from '../../Button/Button';
import './_PayModal.scss';
import { Session } from 'next-auth';

interface ButtonProps {
  label: string;
  theme?: 'primary' | 'secondary' | 'black';
  onClick: () => void;
}

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
  session: Session | null;
  amount: number;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  buttons?: ButtonProps[];
}

function PayModal({
  isOpen,
  onClose,
  content,
  title,
  session,
  amount,
  footer,
  children,
  className = '',
}: PayModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className={`pay-modal ${className}`}
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
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default PayModal;
