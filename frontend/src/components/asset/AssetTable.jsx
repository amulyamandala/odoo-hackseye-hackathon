import React from 'react';

/**
 * Reusable table component for displaying and clicking lists of assets.
 */
const AssetTable = ({
  data = [],
  columns = [],
  loading = false,
  emptyState = 'No assets found',
  onRowClick,
  className = '',
  ...props
}) => {
  if (loading) {
    return <div className="table-loading">Loading assets data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">{emptyState}</div>;
  }

  return (
    <table className={`custom-asset-table ${className}`} {...props}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row.id || rowIndex}
            onClick={() => onRowClick && onRowClick(row)}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((col, colIndex) => {
              const value = col.accessor ? (typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]) : '';
              return (
                <td key={colIndex}>
                  {col.render ? col.render(row) : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssetTable;
