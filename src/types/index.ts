export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  description: string;
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_precision: string;
  rocket: string; // rocket ID
  success: boolean | null;
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
  details: string | null;
  launchpad: string; // launchpad ID
  upcoming: boolean;
}

export interface LaunchDetails extends Launch {
  rocketData?: Rocket;
  launchpadData?: Launchpad;
}

export interface FilterOptions {
  year?: number;
  missionType?: 'all' | 'upcoming' | 'past';
}
