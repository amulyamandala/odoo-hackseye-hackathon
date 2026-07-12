import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
