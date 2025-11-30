import { Launch, FilterOptions } from '../types/index';

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'TBD';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Invalid Date';
  }
};

export const getYear = (dateString: string | null | undefined): number => {
  if (!dateString) return 0;
  try {
    return new Date(dateString).getFullYear();
  } catch {
    return 0;
  }
};

export const filterLaunches = (
  launches: Launch[],
  filters: FilterOptions
): Launch[] => {
  return launches.filter(launch => {
    // Filter by mission type
    if (filters.missionType === 'upcoming' && !launch.upcoming) {
      return false;
    }
    if (filters.missionType === 'past' && launch.upcoming) {
      return false;
    }

    // Filter by year
    if (filters.year) {
      const launchYear = getYear(launch.date_utc);
      if (launchYear !== filters.year) {
        return false;
      }
    }

    return true;
  });
};

export const getAvailableYears = (launches: Launch[]): number[] => {
  const years = new Set<number>();
  launches.forEach(launch => {
    const year = getYear(launch.date_utc);
    if (year > 0) {
      years.add(year);
    }
  });
  return Array.from(years).sort((a, b) => a - b);
};

export const getSuccessRate = (launches: Launch[]): number => {
  if (launches.length === 0) return 0;
  const successful = launches.filter(l => l.success === true).length;
  return Math.round((successful / launches.length) * 100);
};

export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US').format(num);
};

export const truncateText = (text: string | null | undefined, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
