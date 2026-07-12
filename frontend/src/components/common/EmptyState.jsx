import React from 'react';

const EmptyState = ({
  message = 'No data available',
  description = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`custom-empty-state ${className}`} {...props}>
      <h3>{message}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default EmptyState;
