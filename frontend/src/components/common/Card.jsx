import React from 'react';

const Card = ({
  children,
  title,
  className = '',
  ...props
}) => {
  return (
    <div className={`custom-card ${className}`} {...props}>
      {title && <div className="card-header"><h3>{title}</h3></div>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
