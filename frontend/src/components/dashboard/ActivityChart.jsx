import React from 'react';

// ─── Pure-CSS bar chart & SVG donut — no chart library needed ────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const BAR_DATA = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 70 },
  { label: 'May', value: 63 },
  { label: 'Jun', value: 88 },
  { label: 'Jul', value: 75 },
];

const DONUT_DATA = [
  { label: 'Allocated',    value: 982, color: '#6366f1', pct: 78 },
  { label: 'Available',    value: 184, color: '#10b981', pct: 15 },
  { label: 'Maintenance',  value:  82, color: '#f59e0b', pct:  7 },
];

// Donut circumference for r=44
const R = 44;
const CIRC = 2 * Math.PI * R;

/**
 * Build stroke-dasharray segments for an SVG donut.
 * Returns an array of { offset, length, color } for each slice.
 */
const buildSegments = (data) => {
  const total = data.reduce((s, d) => s + d.pct, 0);
  let cursor = 0;
  return data.map((d) => {
    const length = (d.pct / total) * CIRC;
    const offset = CIRC - cursor;
    cursor += length;
    return { offset, length, color: d.color };
  });
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const BarChart = ({ data = BAR_DATA }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Asset Activity</h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last 7 months</span>
      </div>

      <div className="bar-chart">
        {data.map((d) => (
          <div className="bar-group" key={d.label}>
            <div className="bar-val">{d.value}</div>
            <div className="bar-wrap">
              <div
                className="bar primary"
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.label}: ${d.value}`}
              />
            </div>
            <div className="bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DonutChart = ({ data = DONUT_DATA }) => {
  const segments = buildSegments(data);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="section-panel">
      <div className="section-header">
        <h2>Asset Distribution</h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current status</span>
      </div>

      <div className="donut-wrap">
        {/* SVG Donut */}
        <div className="donut-chart">
          <svg className="donut-svg" viewBox="0 0 100 100">
            {/* track */}
            <circle className="donut-track" cx="50" cy="50" r={R} />
            {/* segments */}
            {segments.map((seg, i) => (
              <circle
                key={i}
                className="donut-seg"
                cx="50"
                cy="50"
                r={R}
                stroke={seg.color}
                strokeDasharray={`${seg.length} ${CIRC - seg.length}`}
                strokeDashoffset={seg.offset}
              />
            ))}
          </svg>
          <div className="donut-center">
            <div className="donut-pct">{total.toLocaleString()}</div>
            <div className="donut-sub">Total</div>
          </div>
        </div>

        {/* Legend */}
        <div className="donut-legend">
          {data.map((d) => (
            <div className="legend-item" key={d.label}>
              <span className="legend-dot" style={{ background: d.color }} />
              <span>{d.label}</span>
              <span className="legend-val">{d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ActivityChart
 * Renders a bar chart (monthly activity) and a donut chart (asset distribution)
 * side-by-side. Both accept optional `data` props for real API integration later.
 *
 * @param {Array} barData   - Override default bar chart data
 * @param {Array} donutData - Override default donut data
 */
const ActivityChart = ({ barData, donutData }) => {
  return (
    <div className="chart-grid">
      <BarChart data={barData || BAR_DATA} />
      <DonutChart data={donutData || DONUT_DATA} />
    </div>
  );
};

export default ActivityChart;
