# Google Maps Integration Setup

## Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API

4. Create an API key:
   - Go to "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

5. Restrict the key (for production):
   - Click on the key
   - Under "Key restrictions" → "Application restrictions" → Select "HTTP referrers"
   - Add your domain(s)
   - Under "API restrictions" → Select "Maps JavaScript API"

6. Add to `frontend/.env`:
\`\`\`
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
\`\`\`

## How It Works

The JobsMapView component:
- Loads Google Maps dynamically
- Fetches nearby jobs from the backend
- Plots job locations as markers on the map
- Shows job details in info windows on marker click
- Auto-fits the map to show all nearby jobs

## Demo Coordinates

Currently using randomized coordinates around a default location. In production, you should:
- Use actual geocoding API to get coordinates from addresses
- Store coordinates in the Job model
- Or use third-party geocoding service

## API Keys Needed

- Google Maps API Key: For displaying maps
- Google Client ID: For OAuth login (already configured)
