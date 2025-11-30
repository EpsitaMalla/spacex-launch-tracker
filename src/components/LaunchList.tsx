import React from 'react';
import { Launch, Rocket, Launchpad } from '../types/index';
import { LaunchCard } from './LaunchCard';

interface LaunchListProps {
  launches: Launch[];
  rockets: Map<string, Rocket>;
  launchpads: Map<string, Launchpad>;
  isLoading: boolean;
  onSelectLaunch: (launch: Launch) => void;
}

export const LaunchList: React.FC<LaunchListProps> = ({
  launches,
  rockets,
  launchpads,
  isLoading,
  onSelectLaunch,
}) => {
  if (isLoading) {
    return (
      <div className="launch-list">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading launches...</p>
        </div>
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="launch-list">
        <div className="empty-state">
          <p>No launches found matching your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="launch-list">
      {launches.map(launch => (
        <LaunchCard
          key={launch.id}
          launch={launch}
          rocket={rockets.get(launch.rocket)}
          launchpad={launchpads.get(launch.launchpad)}
          onSelect={onSelectLaunch}
        />
      ))}
    </div>
  );
};
