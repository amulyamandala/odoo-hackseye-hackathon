import React from 'react';

const Table = ({
  headers = [],
  data = [],
  renderRow,
  className = '',
  ...props
}) => {
  return (
    <table className={`custom-table ${className}`} {...props}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          renderRow ? renderRow(item, index) : (
            <tr key={index}>
              {Object.values(item).map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
};

export default Table;
