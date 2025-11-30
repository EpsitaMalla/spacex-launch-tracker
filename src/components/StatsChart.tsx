import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Launch } from '../types/index';
import { getYear } from '../utils/filters';

interface StatsChartProps {
  launches: Launch[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ launches }) => {
  // Calculate yearly stats
  const yearlyStats = launches.reduce((acc, launch) => {
    const year = getYear(launch.date_utc);
    if (year > 0) {
      const existing = acc.find(item => item.year === year);
      if (existing) {
        existing.total += 1;
        if (launch.success === true) existing.successful += 1;
        if (launch.success === false) existing.failed += 1;
      } else {
        acc.push({
          year,
          total: 1,
          successful: launch.success === true ? 1 : 0,
          failed: launch.success === false ? 1 : 0,
        });
      }
    }
    return acc;
  }, [] as Array<{ year: number; total: number; successful: number; failed: number }>);

  yearlyStats.sort((a, b) => a.year - b.year);

  // Calculate overall stats
  const totalLaunches = launches.length;
  const successful = launches.filter(l => l.success === true).length;
  const failed = launches.filter(l => l.success === false).length;
  const upcoming = launches.filter(l => l.upcoming).length;

  const successRateData = [
    { name: 'Successful', value: successful, color: '#10b981' },
    { name: 'Failed', value: failed, color: '#ef4444' },
    { name: 'Upcoming', value: upcoming, color: '#f59e0b' },
  ];

  return (
    <div className="stats-container">
      <h2>Launch Statistics</h2>

      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-number">{totalLaunches}</div>
          <div className="stat-label">Total Launches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{successful}</div>
          <div className="stat-label">Successful</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{failed}</div>
          <div className="stat-label">Failed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{((successful / (totalLaunches - upcoming)) * 100).toFixed(1)}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Yearly Bar Chart */}
        <div className="chart-wrapper">
          <h3>Launches by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="successful" stackId="a" fill="#10b981" name="Successful" />
              <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Pie Chart */}
        <div className="chart-wrapper">
          <h3>Success Rate Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={successRateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {successRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Launches Line Chart */}
        <div className="chart-wrapper full-width">
          <h3>Cumulative Launches Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                name="Total Launches"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
