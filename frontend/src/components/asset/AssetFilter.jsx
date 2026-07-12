import React from 'react';

/**
 * Reusable layout to filter inventory selections dynamically.
 */
const AssetFilter = ({
  search = '',
  category = '',
  status = '',
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
  categories = [],
  statuses = [],
  className = '',
  ...props
}) => {
  return (
    <div className={`custom-asset-filter ${className}`} {...props}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        placeholder="Search..."
        className="filter-search"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Statuses</option>
        {statuses.map((stat, idx) => (
          <option key={idx} value={stat}>
            {stat}
          </option>
        ))}
      </select>

      {onReset && (
        <button type="button" onClick={onReset} className="filter-reset-btn">
          Reset
        </button>
      )}
    </div>
  );
};

export default AssetFilter;
