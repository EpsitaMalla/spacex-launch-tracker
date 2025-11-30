import React from 'react';
import { formatDate, formatNumber } from '../utils/filters';
import { Launch, Rocket, Launchpad } from '../types/index';
import { Rocket as RocketIcon, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface LaunchCardProps {
  launch: Launch;
  rocket?: Rocket;
  launchpad?: Launchpad;
  onSelect: (launch: Launch) => void;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({
  launch,
  rocket,
  launchpad,
  onSelect,
}) => {
  const statusColor = launch.upcoming
    ? 'upcoming'
    : launch.success
    ? 'success'
    : launch.success === false
    ? 'failed'
    : 'unknown';

  return (
    <div className={`launch-card launch-${statusColor}`} onClick={() => onSelect(launch)}>
      <div className="launch-card-header">
        <div className="launch-title-section">
          <h3 className="launch-name">{launch.name}</h3>
          <div className="launch-status">
            {launch.upcoming && <span className="status-badge upcoming">Upcoming</span>}
            {!launch.upcoming && launch.success && (
              <span className="status-badge success">Successful</span>
            )}
            {!launch.upcoming && launch.success === false && (
              <span className="status-badge failed">Failed</span>
            )}
          </div>
        </div>
        {launch.success !== null && (
          <div className="status-icon">
            {launch.success ? (
              <CheckCircle size={24} className="success-icon" />
            ) : (
              <XCircle size={24} className="failed-icon" />
            )}
          </div>
        )}
      </div>

      <div className="launch-details">
        <div className="detail-item">
          <Calendar size={16} />
          <span>{formatDate(launch.date_utc)}</span>
        </div>

        {rocket && (
          <div className="detail-item">
            <RocketIcon size={16} />
            <span>{rocket.name}</span>
          </div>
        )}

        {launchpad && (
          <div className="detail-item">
            <MapPin size={16} />
            <span>{launchpad.full_name || launchpad.name}</span>
          </div>
        )}
      </div>

      {launch.details && (
        <div className="launch-description">
          <p>{launch.details.substring(0, 100)}...</p>
        </div>
      )}
    </div>
  );
};
