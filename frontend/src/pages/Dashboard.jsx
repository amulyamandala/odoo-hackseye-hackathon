import React from 'react';
import { Package, Users, Activity, Wrench, Download } from 'lucide-react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard       from '../components/dashboard/StatsCard';
import RecentAssets    from '../components/dashboard/RecentAssets';
import ActivityChart   from '../components/dashboard/ActivityChart';

import '../styles/dashboard.css';

const STATS = [
  { title: 'Total Assets',      value: '1,248', icon: Package,  color: 'blue',   trend: '+12%', isUp: true  },
  { title: 'Allocated',         value: '982',   icon: Users,    color: 'green',  trend: '+5%',  isUp: true  },
  { title: 'Pending Requests',  value: '34',    icon: Activity, color: 'orange', trend: '-2%',  isUp: false },
  { title: 'In Maintenance',    value: '18',    icon: Wrench,   color: 'purple', trend: '+1%',  isUp: true  },
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of your enterprise assets and recent activities."
        actions={
          <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            <Download size={16} />
            Export Report
          </button>
        }
      />

      {/* Stats Grid */}
      <div className="metrics-grid">
        {STATS.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <ActivityChart />

      {/* Recent Assets Table */}
      <div style={{ marginTop: '1.5rem' }}>
        <RecentAssets onViewAll={() => {}} />
      </div>
    </div>
  );
};

export default Dashboard;
