import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className={`custom-modal-content ${className}`} onClick={(e) => e.stopPropagation()} {...props}>
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
