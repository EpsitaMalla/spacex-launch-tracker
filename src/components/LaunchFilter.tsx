import React from 'react';
import { FilterOptions } from '../types/index';
import { Filter } from 'lucide-react';

interface LaunchFilterProps {
  missionType: 'all' | 'upcoming' | 'past';
  selectedYear: number | undefined;
  availableYears: number[];
  onMissionTypeChange: (type: 'all' | 'upcoming' | 'past') => void;
  onYearChange: (year: number | undefined) => void;
}

export const LaunchFilter: React.FC<LaunchFilterProps> = ({
  missionType,
  selectedYear,
  availableYears,
  onMissionTypeChange,
  onYearChange,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <Filter size={20} />
        <h2>Filters</h2>
      </div>

      <div className="filter-group">
        <label>Mission Type</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${missionType === 'all' ? 'active' : ''}`}
            onClick={() => onMissionTypeChange('all')}
          >
            All Missions
          </button>
          <button
            className={`filter-btn ${missionType === 'upcoming' ? 'active' : ''}`}
            onClick={() => onMissionTypeChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${missionType === 'past' ? 'active' : ''}`}
            onClick={() => onMissionTypeChange('past')}
          >
            Past
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="year-select">Year</label>
        <select
          id="year-select"
          value={selectedYear || ''}
          onChange={e => onYearChange(e.target.value ? parseInt(e.target.value) : undefined)}
          className="year-select"
        >
          <option value="">All Years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
