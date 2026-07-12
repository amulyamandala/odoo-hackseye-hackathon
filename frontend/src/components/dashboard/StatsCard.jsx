import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatsCard
 * @param {string}        title   - Metric label
 * @param {string|number} value   - Primary display value
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string}        color   - Icon color key: blue | green | orange | purple | red
 * @param {string}        trend   - Trend string e.g. "+12%"
 * @param {boolean}       isUp    - Whether the trend is positive
 * @param {string}        label   - Optional sub-label e.g. "from last month"
 */
const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  isUp = true,
  label = 'from last month',
}) => {
  return (
    <div className="metric-card glass-panel">
      <div className="metric-header">
        <span>{title}</span>
        <div className={`metric-icon ${color}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="metric-value">{value}</div>

      <div className="metric-footer">
        {trend && (
          <div className={`metric-trend ${isUp ? 'up' : 'down'}`}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
        {label && <span className="metric-label">{label}</span>}
      </div>
    </div>
  );
};

export default StatsCard;
