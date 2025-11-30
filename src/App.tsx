import { useState, useEffect } from 'react';
import './App.css';
import { spaceXApi } from './services/spaceXApi';
import { Launch, Rocket, Launchpad } from './types/index';
import { LaunchList } from './components/LaunchList';
import { LaunchFilter } from './components/LaunchFilter';
import { LaunchDetails } from './components/LaunchDetails';
import { StatsChart } from './components/StatsChart';
import { filterLaunches, getAvailableYears } from './utils/filters';
import { Rocket as RocketIcon } from 'lucide-react';

function App() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [rockets, setRockets] = useState<Map<string, Rocket>>(new Map());
  const [launchpads, setLaunchpads] = useState<Map<string, Launchpad>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [missionType, setMissionType] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  // Details modal state
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [showStats, setShowStats] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch launches, rockets, and launchpads in parallel
        const [launchesData, rocketsData, launchpadsData] = await Promise.all([
          spaceXApi.getLaunches(),
          spaceXApi.getRockets(),
          spaceXApi.getLaunchpads(),
        ]);

        setLaunches(launchesData);

        // Create maps for quick lookup
        const rocketsMap = new Map();
        rocketsData.forEach(rocket => {
          rocketsMap.set(rocket.id, rocket);
        });
        setRockets(rocketsMap);

        const launchpadsMap = new Map();
        launchpadsData.forEach(launchpad => {
          launchpadsMap.set(launchpad.id, launchpad);
        });
        setLaunchpads(launchpadsMap);

        // Extract available years
        const years = getAvailableYears(launchesData);
        setAvailableYears(years);
      } catch (err) {
        setError('Failed to load SpaceX data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter launches based on current filters
  const filteredLaunches = filterLaunches(launches, {
    missionType,
    year: selectedYear,
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <RocketIcon size={40} className="logo-icon" />
            <div>
              <h1>SpaceX Launch Tracker</h1>
              <p>Real-time SpaceX mission data</p>
            </div>
          </div>
          <button
            className={`stats-toggle ${showStats ? 'active' : ''}`}
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <div className="content-wrapper">
          <aside className="sidebar">
            <LaunchFilter
              missionType={missionType}
              selectedYear={selectedYear}
              availableYears={availableYears}
              onMissionTypeChange={setMissionType}
              onYearChange={setSelectedYear}
            />
          </aside>

          <div className="main-content">
            {showStats && <StatsChart launches={launches} />}

            <div className="launches-section">
              <div className="section-header">
                <h2>
                  {missionType === 'upcoming' && 'Upcoming Launches'}
                  {missionType === 'past' && 'Past Launches'}
                  {missionType === 'all' && 'All Launches'}
                </h2>
                <span className="launch-count">{filteredLaunches.length} launches</span>
              </div>
              <LaunchList
                launches={filteredLaunches}
                rockets={rockets}
                launchpads={launchpads}
                isLoading={isLoading}
                onSelectLaunch={setSelectedLaunch}
              />
            </div>
          </div>
        </div>
      </main>

      {selectedLaunch && (
        <LaunchDetails
          launch={selectedLaunch}
          rocket={rockets.get(selectedLaunch.rocket)}
          launchpad={launchpads.get(selectedLaunch.launchpad)}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
    </div>
  );
}

export default App;
