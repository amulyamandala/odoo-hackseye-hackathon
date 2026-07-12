import React from 'react';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`custom-input ${className}`}
      {...props}
    />
  );
};

export default Input;
