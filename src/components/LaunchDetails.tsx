import React from 'react';
import { Launch, Rocket, Launchpad } from '../types/index';
import { formatDate, formatNumber } from '../utils/filters';
import { X, ExternalLink } from 'lucide-react';

interface LaunchDetailsProps {
  launch: Launch;
  rocket?: Rocket;
  launchpad?: Launchpad;
  onClose: () => void;
}

export const LaunchDetails: React.FC<LaunchDetailsProps> = ({
  launch,
  rocket,
  launchpad,
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{launch.name}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Launch Information */}
          <div className="details-section">
            <h3>Launch Information</h3>
            <div className="details-grid">
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{formatDate(launch.date_utc)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className="value">
                  {launch.upcoming && 'Upcoming'}
                  {!launch.upcoming && launch.success && 'Successful'}
                  {!launch.upcoming && launch.success === false && 'Failed'}
                </span>
              </div>
              {launch.details && (
                <div className="detail-row full-width">
                  <span className="label">Details:</span>
                  <span className="value">{launch.details}</span>
                </div>
              )}
            </div>
          </div>

          {/* Rocket Information */}
          {rocket && (
            <div className="details-section">
              <h3>Rocket Information</h3>
              <div className="details-grid">
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{rocket.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span className="value">{rocket.type}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className="value">{rocket.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Stages:</span>
                  <span className="value">{rocket.stages}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Boosters:</span>
                  <span className="value">{rocket.boosters}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Success Rate:</span>
                  <span className="value">{rocket.success_rate_pct.toFixed(1)}%</span>
                </div>
                <div className="detail-row">
                  <span className="label">Height:</span>
                  <span className="value">{rocket.height.meters}m / {rocket.height.feet}ft</span>
                </div>
                <div className="detail-row">
                  <span className="label">Diameter:</span>
                  <span className="value">{rocket.diameter.meters}m / {rocket.diameter.feet}ft</span>
                </div>
                <div className="detail-row">
                  <span className="label">Mass:</span>
                  <span className="value">{formatNumber(rocket.mass.kg)}kg / {formatNumber(rocket.mass.lb)}lbs</span>
                </div>
                <div className="detail-row">
                  <span className="label">Cost per Launch:</span>
                  <span className="value">${formatNumber(rocket.cost_per_launch)}</span>
                </div>
                <div className="detail-row full-width">
                  <span className="label">Description:</span>
                  <span className="value">{rocket.description}</span>
                </div>
              </div>
            </div>
          )}

          {/* Launch Pad Information */}
          {launchpad && (
            <div className="details-section">
              <h3>Launch Site</h3>
              <div className="details-grid">
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{launchpad.full_name || launchpad.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Location:</span>
                  <span className="value">{launchpad.locality}, {launchpad.region}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Coordinates:</span>
                  <span className="value">{launchpad.latitude.toFixed(4)}, {launchpad.longitude.toFixed(4)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Map:</span>
                  <a
                    href={`https://www.google.com/maps/?q=${launchpad.latitude},${launchpad.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    View on Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Failures Information */}
          {launch.failures && launch.failures.length > 0 && (
            <div className="details-section">
              <h3>Failures</h3>
              <div className="failures-list">
                {launch.failures.map((failure, idx) => (
                  <div key={idx} className="failure-item">
                    <p><strong>Reason:</strong> {failure.reason}</p>
                    <p><strong>Time:</strong> {failure.time}s</p>
                    {failure.altitude && <p><strong>Altitude:</strong> {failure.altitude}m</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
