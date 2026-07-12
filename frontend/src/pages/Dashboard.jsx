import React from 'react';
import { Package, Users, Activity, CheckCircle, ArrowUpRight, ArrowDownRight, Laptop, Smartphone } from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Assets', value: '1,248', icon: Package, color: 'blue', trend: '+12%', isUp: true },
    { title: 'Allocated', value: '982', icon: Users, color: 'green', trend: '+5%', isUp: true },
    { title: 'Pending Requests', value: '34', icon: Activity, color: 'orange', trend: '-2%', isUp: false },
    { title: 'Maintenance', value: '18', icon: CheckCircle, color: 'purple', trend: '+1%', isUp: true },
  ];

  const recentActivity = [
    { id: 1, asset: 'MacBook Pro M2', type: 'Laptop', user: 'Sarah Connor', action: 'Allocation Requested', date: '2 hours ago', status: 'Pending' },
    { id: 2, asset: 'Dell UltraSharp 27"', type: 'Monitor', user: 'John Smith', action: 'Assigned', date: '5 hours ago', status: 'Approved' },
    { id: 3, asset: 'iPhone 14 Pro', type: 'Smartphone', user: 'Mike Johnson', action: 'Return Requested', date: '1 day ago', status: 'Pending' },
    { id: 4, asset: 'Herman Miller Chair', type: 'Furniture', user: 'Emma Davis', action: 'Maintenance', date: '2 days ago', status: 'Rejected' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getAssetIcon = (type) => {
    switch (type) {
      case 'Laptop': return <Laptop size={16} />;
      case 'Smartphone': return <Smartphone size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your enterprise assets and recent activities.</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card glass-panel">
            <div className="metric-header">
              <span style={{ fontWeight: 500 }}>{metric.title}</span>
              <div className={`metric-icon ${metric.color}`}>
                <metric.icon size={20} />
              </div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-trend ${metric.isUp ? 'up' : 'down'}`}>
              {metric.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {metric.trend} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="activity-section">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <button className="btn btn-secondary">View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Requested By</th>
                <th>Action</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <div className="asset-cell">
                      <div className="asset-avatar">
                        {getAssetIcon(activity.type)}
                      </div>
                      {activity.asset}
                    </div>
                  </td>
                  <td>{activity.user}</td>
                  <td>{activity.action}</td>
                  <td>{activity.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
