import React from 'react';

/**
 * Reusable card element for displaying generic asset properties.
 */
const AssetCard = ({ asset, actions, className = '', ...props }) => {
  if (!asset) return null;

  return (
    <div className={`custom-asset-card ${className}`} {...props}>
      <div className="card-content">
        <h4 className="asset-title">{asset.name || 'Unnamed Asset'}</h4>
        <p className="asset-tag">Tag: {asset.tag || 'N/A'}</p>
        <p className="asset-status">Status: {asset.status || 'N/A'}</p>
        <p className="asset-category">Category: {asset.category || 'N/A'}</p>
        <p className="asset-location">Location: {asset.location || 'N/A'}</p>
        {asset.assignedTo && <p className="asset-assignee">Assigned to: {asset.assignedTo}</p>}
      </div>
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default AssetCard;
