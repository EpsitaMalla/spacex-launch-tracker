# SpaceX Launch Tracker 🚀

A modern React + Vite application that provides real-time SpaceX mission data with an advanced UI for exploring launches, rockets, and launch sites.

## 🌟 Features

- **View Launches**: Browse upcoming and past SpaceX missions
- **Launch Details**: Click on any mission to view comprehensive information including rocket specs and failure details
- **Interactive Filtering**: Filter launches by mission type (Upcoming/Past) and year
- **Rocket Information**: View detailed specifications for each rocket including dimensions, mass, and success rates
- **Launch Site Maps**: View launch site locations with links to Google Maps
- **Launch Statistics**: Visualize launch data with interactive charts showing:
  - Yearly launch trends
  - Success rate overview
  - Cumulative launches over time
- **Responsive Design**: Beautiful dark-themed UI that works on all device sizes
- **Real-time Data**: Fetches live data from the SpaceX API

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **HTTP Client**: Axios
- **Charts & Visualization**: Recharts
- **Icons**: Lucide React
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **API**: [SpaceX API v4](https://github.com/r-spacex/SpaceX-API)

## 📦 Project Structure

```
src/
├── components/
│   ├── LaunchCard.tsx       # Individual launch card component
│   ├── LaunchDetails.tsx    # Modal for detailed launch information
│   ├── LaunchFilter.tsx     # Filter controls (mission type, year)
│   ├── LaunchList.tsx       # Grid layout for launch cards
│   └── StatsChart.tsx       # Interactive charts and statistics
├── services/
│   └── spaceXApi.ts         # API service for SpaceX data fetching
├── types/
│   └── index.ts             # TypeScript interfaces and types
├── utils/
│   └── filters.ts           # Utility functions for filtering and formatting
├── App.tsx                  # Main application component
├── App.css                  # Application styles
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📊 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Key Components

### LaunchCard
Displays a compact view of a launch with status indicator, date, rocket name, and launch site. Clickable to view full details.

### LaunchDetails Modal
Shows comprehensive information about a launch including:
- Launch information and status
- Detailed rocket specifications
- Launch pad coordinates and location
- Failure details if applicable
- Direct links to Google Maps for launch sites

### LaunchFilter
Interactive filters allowing users to:
- Switch between All/Upcoming/Past missions
- Filter launches by year with a dropdown selector

### StatsChart
Visualizes launch statistics with:
- Summary cards showing total, successful, and failed launches
- Bar charts for yearly launch trends
- Pie chart for success rate distribution
- Line chart for cumulative launches over time

### LaunchList
Responsive grid layout that displays filtered launch cards with loading and empty states.

## 🎯 Features in Detail

### Real-time Data Integration
The app integrates with the free SpaceX API v4 endpoint, fetching:
- All launches with detailed metadata
- Rocket specifications and performance data
- Launch pad information and coordinates

### Advanced Filtering
- **Mission Type Filter**: Toggle between Upcoming, Past, or All launches
- **Year Filter**: Select specific years to narrow down results
- Dynamic year selector populated from available launch data

### Interactive UI
- Smooth animations and transitions
- Hover effects on cards and buttons
- Modal dialogs for detailed information
- Loading spinners during data fetching
- Empty state messaging

### Responsive Design
The layout adapts to different screen sizes:
- Desktop: Sidebar filter + multi-column launch grid
- Tablet: Stack layout with single filter column
- Mobile: Full-width layout optimized for touch

## 🔧 API Integration

The `spaceXApi` service provides these methods:

```typescript
- getLaunches()          // Get all launches
- getUpcomingLaunches()  // Get upcoming missions
- getPastLaunches()      // Get past missions
- getLaunch(id)          // Get single launch details
- getRockets()           // Get all rockets
- getRocket(id)          // Get single rocket
- getLaunchpads()        // Get all launch pads
- getLaunchpad(id)       // Get single launch pad
- getLaunchStats()       // Calculate aggregate statistics
```

## 🎨 Styling Highlights

- **Dark Theme**: Modern dark color scheme with blue/cyan accents
- **Color Scheme**:
  - Primary: #0066cc (Blue)
  - Secondary: #00d4ff (Cyan)
  - Success: #10b981 (Green)
  - Warning: #f59e0b (Orange)
  - Danger: #ef4444 (Red)
- **Animations**: Smooth transitions and hover effects throughout
- **Responsive Grid**: Auto-fitting grid layouts that adapt to viewport

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚦 Performance Optimizations

- Parallel API requests for launches, rockets, and launchpads
- Efficient map data structures for O(1) lookups
- Responsive images and lazy-loaded charts
- Optimized CSS with minimal repaints

## 🐛 Known Limitations

- Chart rendering may require larger viewports for optimal display
- Some launch dates may show as 'TBD' due to SpaceX API data
- Map links require an internet connection and Google Maps availability

## 📖 Learning Resources

This project demonstrates:
- React hooks (useState, useEffect) for state management
- TypeScript interfaces for type safety
- API integration with async/await
- Component composition and prop drilling
- CSS Grid and Flexbox layouts
- Chart visualization with Recharts
- Error handling and loading states

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [SpaceX API](https://github.com/r-spacex/SpaceX-API) for providing free access to mission data
- [React](https://react.dev) and [Vite](https://vite.dev) for excellent development experience
- [Recharts](https://recharts.org) for beautiful chart visualizations
- [Lucide React](https://lucide.dev) for icon components

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
