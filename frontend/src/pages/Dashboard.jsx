import React, { useState, useEffect } from 'react';
import { Package, Users, Activity, Wrench, Download } from 'lucide-react';
import api from '../services/api';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard       from '../components/dashboard/StatsCard';
import RecentAssets    from '../components/dashboard/RecentAssets';
import ActivityChart   from '../components/dashboard/ActivityChart';

import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/reports/dashboard');
        const { assetSummary, bookingStats, maintenanceStats } = response;
        
        setStats([
          { title: 'Total Assets',      value: assetSummary.totalAssets.toString(), icon: Package,  color: 'blue',   trend: '+0%', isUp: true  },
          { title: 'Allocated',         value: assetSummary.allocated.toString(),   icon: Users,    color: 'green',  trend: '+0%',  isUp: true  },
          { title: 'Pending Bookings',  value: bookingStats.pendingBookings.toString(),    icon: Activity, color: 'orange', trend: '+0%',  isUp: false },
          { title: 'In Maintenance',    value: assetSummary.inMaintenance.toString(),    icon: Wrench,   color: 'purple', trend: '+0%',  isUp: true  },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // Fallback to empty if it fails
        setStats([
          { title: 'Total Assets',      value: '0', icon: Package,  color: 'blue',   trend: '-', isUp: true  },
          { title: 'Allocated',         value: '0',   icon: Users,    color: 'green',  trend: '-',  isUp: true  },
          { title: 'Pending Bookings',  value: '0',    icon: Activity, color: 'orange', trend: '-',  isUp: false },
          { title: 'In Maintenance',    value: '0',    icon: Wrench,   color: 'purple', trend: '-',  isUp: true  },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

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
        {loading ? (
           <p style={{ color: 'var(--text-secondary)' }}>Loading live stats...</p>
        ) : (
          stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))
        )}
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
