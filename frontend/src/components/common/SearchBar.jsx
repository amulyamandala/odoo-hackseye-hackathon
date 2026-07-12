import React from 'react';

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  onSubmit,
  className = '',
  ...props
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={`custom-search-bar ${className}`} {...props}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {onSubmit && (
        <button onClick={() => onSubmit(value)}>Search</button>
      )}
    </div>
  );
};

export default SearchBar;
