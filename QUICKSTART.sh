#!/bin/bash
# SpaceX Launch Tracker - Quick Start Script
# This file contains all the commands needed to get the project running

echo "🚀 SpaceX Launch Tracker - Quick Start Guide"
echo "============================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

echo "📦 Step 1: Install Dependencies"
echo "Command: npm install"
echo ""

echo "🔥 Step 2: Start Development Server"
echo "Command: npm run dev"
echo "This will open the app at: http://localhost:5173"
echo ""

echo "🏗️  Step 3: Build for Production"
echo "Command: npm run build"
echo "This creates an optimized 'dist' folder ready to deploy"
echo ""

echo "👀 Step 4: Preview Production Build"
echo "Command: npm run preview"
echo "Test your production build locally"
echo ""

echo "✨ Step 5: Lint Code Quality"
echo "Command: npm run lint"
echo "Check code quality with ESLint"
echo ""

echo "============================================"
echo "📚 Project Structure:"
echo "  src/components/  - React components"
echo "  src/services/    - API integration"
echo "  src/types/       - TypeScript definitions"
echo "  src/utils/       - Helper functions"
echo "  src/App.tsx      - Main application"
echo ""

echo "🎨 Features:"
echo "  ✓ View SpaceX launches (upcoming & past)"
echo "  ✓ Detailed rocket information"
echo "  ✓ Launch site locations with maps"
echo "  ✓ Filter by year and mission type"
echo "  ✓ Interactive statistics charts"
echo "  ✓ Modern responsive UI"
echo ""

echo "🌐 API:"
echo "  Data source: SpaceX API v4"
echo "  https://github.com/r-spacex/SpaceX-API"
echo ""

echo "📖 Documentation:"
echo "  - README.md              - Project overview"
echo "  - BUILD_SUMMARY.md       - What was built"
echo "  - IMPLEMENTATION_GUIDE.md - Detailed guide"
echo ""

echo "🚀 Ready to start? Run:"
echo "  cd /workspaces/spacex-launch-tracker"
echo "  npm install"
echo "  npm run dev"
echo ""

echo "🎉 Happy coding!"
