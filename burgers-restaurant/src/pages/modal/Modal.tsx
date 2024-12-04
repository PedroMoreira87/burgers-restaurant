import React, { ReactNode } from 'react';

import close from '../../assets/icons/close.svg';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
