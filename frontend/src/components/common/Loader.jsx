import React from 'react';

const Loader = ({ className = '', text = 'Loading...', ...props }) => {
  return (
    <div className={`custom-loader ${className}`} {...props}>
      <div className="spinner"></div>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loader;
