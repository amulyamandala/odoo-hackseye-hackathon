import React from 'react';
import { Package, Laptop, Smartphone, Monitor, Car, Armchair } from 'lucide-react';

const ASSET_ICONS = {
  Laptop: Laptop,
  Smartphone: Smartphone,
  Monitor: Monitor,
  Vehicle: Car,
  Furniture: Armchair,
};

const STATUS_CLASS = {
  Approved: 'status-approved',
  Active: 'status-active',
  Pending: 'status-pending',
  Rejected: 'status-rejected',
  Maintenance: 'status-maintenance',
};

/**
 * RecentAssets
 * @param {Array}  assets   - Array of asset activity objects
 * @param {number} maxRows  - Max rows to display (default 5)
 * @param {Function} onViewAll - Callback for "View All" button
 */
const RecentAssets = ({ assets = [], maxRows = 5, onViewAll }) => {
  const defaultAssets = [
    { id: 1, asset: 'MacBook Pro M2', category: 'Laptop', serialNumber: 'SN-2024-001', user: 'Sarah Connor', action: 'Allocation Requested', date: '2 hours ago', status: 'Pending' },
    { id: 2, asset: 'Dell UltraSharp 27"', category: 'Monitor', serialNumber: 'SN-2024-002', user: 'John Smith', action: 'Assigned', date: '5 hours ago', status: 'Approved' },
    { id: 3, asset: 'iPhone 14 Pro', category: 'Smartphone', serialNumber: 'SN-2024-003', user: 'Mike Johnson', action: 'Return Requested', date: '1 day ago', status: 'Pending' },
    { id: 4, asset: 'Herman Miller Chair', category: 'Furniture', serialNumber: 'SN-2024-004', user: 'Emma Davis', action: 'Maintenance', date: '2 days ago', status: 'Maintenance' },
    { id: 5, asset: 'Toyota Camry 2023', category: 'Vehicle', serialNumber: 'SN-2024-005', user: 'David Lee', action: 'Booking Approved', date: '3 days ago', status: 'Active' },
  ];

  const data = (assets.length ? assets : defaultAssets).slice(0, maxRows);

  const getIcon = (category) => {
    const Icon = ASSET_ICONS[category] || Package;
    return <Icon size={16} />;
  };

  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Recent Assets</h2>
        <button className="btn btn-secondary" onClick={onViewAll} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          View All
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Serial No.</th>
              <th>Assigned To</th>
              <th>Action</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="asset-cell">
                    <div className="asset-avatar">{getIcon(item.category)}</div>
                    <div>
                      <div>{item.asset}</div>
                      <div className="asset-sub">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{item.serialNumber}</td>
                <td>{item.user}</td>
                <td>{item.action}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{item.date}</td>
                <td>
                  <span className={`status-badge ${STATUS_CLASS[item.status] || ''}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAssets;
