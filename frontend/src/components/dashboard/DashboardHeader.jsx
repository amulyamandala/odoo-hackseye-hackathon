import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * DashboardHeader
 * @param {string} title       - Page title
 * @param {string} subtitle    - Subtitle / description
 * @param {React.ReactNode} actions - Optional right-side action buttons
 */
const DashboardHeader = ({ title = 'Dashboard', subtitle = 'Overview of your enterprise assets and activities.', actions }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="dashboard-header-right">
        <div className="date-badge">
          <Calendar size={15} />
          {today}
        </div>
        {actions}
      </div>
    </div>
  );
};

export default DashboardHeader;
