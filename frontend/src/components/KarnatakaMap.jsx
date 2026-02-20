import React, { useEffect, useRef, useState } from 'react'

const KarnatakaMap = ({
  center = [14.0, 76.25],
  zoom = 7,
  markers = [],
  onMarkerClick,
  onMapClick,
  height = "400px",
  interactive = true,
  showControls = true
}) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Karnataka bounds
  const karnatakaBounds = {
    north: 18.5,
    south: 11.5,
    east: 78.5,
    west: 74.0
  }

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.onload = initializeMap
      document.head.appendChild(script)
    } else {
      initializeMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map with Karnataka bounds
    mapInstanceRef.current = window.L.map(mapRef.current, {
      center: center,
      zoom: zoom,
      maxBounds: [
        [karnatakaBounds.south, karnatakaBounds.west],
        [karnatakaBounds.north, karnatakaBounds.east]
      ],
      maxBoundsViscosity: 1.0,
      zoomControl: showControls,
      scrollWheelZoom: interactive,
      dragging: interactive,
      touchZoom: interactive,
      doubleClickZoom: interactive,
      boxZoom: interactive,
      keyboard: interactive
    })

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 6
    }).addTo(mapInstanceRef.current)

    // Add Karnataka boundary overlay (simplified)
    addKarnatakaBoundary()

    // Add markers
    markers.forEach(marker => {
      const markerInstance = window.L.marker([marker.lat, marker.lng])
        .addTo(mapInstanceRef.current)

      if (marker.popup) {
        markerInstance.bindPopup(marker.popup)
      }

      if (onMarkerClick && marker.onClick) {
        markerInstance.on('click', () => onMarkerClick(marker))
      }
    })

    // Add map click event listener
    if (onMapClick) {
      mapInstanceRef.current.on('click', (e) => {
        onMapClick(e.latlng)
      })
    }

    setIsLoaded(true)
  }

  const addKarnatakaBoundary = () => {
    // Simplified Karnataka boundary coordinates
    const karnatakaBoundary = [
      [18.5, 74.0], [18.5, 78.5], [11.5, 78.5], [11.5, 74.0], [18.5, 74.0]
    ]

    window.L.polygon(karnatakaBoundary, {
      color: '#0066cc',
      weight: 2,
      fillColor: '#0066cc',
      fillOpacity: 0.1,
      dashArray: '5, 5'
    }).addTo(mapInstanceRef.current)
  }

  const updateMarkers = (newMarkers) => {
    if (!mapInstanceRef.current || !isLoaded) return

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof window.L.Marker) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    // Add new markers
    newMarkers.forEach(marker => {
      const markerInstance = window.L.marker([marker.lat, marker.lng])
        .addTo(mapInstanceRef.current)

      if (marker.popup) {
        markerInstance.bindPopup(marker.popup)
      }

      if (onMarkerClick && marker.onClick) {
        markerInstance.on('click', () => onMarkerClick(marker))
      }
    })
  }

  // Update markers when markers prop changes
  useEffect(() => {
    if (isLoaded) {
      updateMarkers(markers)
    }
  }, [markers, isLoaded])

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #0066cc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }}></div>
            <p>Loading Karnataka Map...</p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .leaflet-control-container {
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .leaflet-popup-tip {
          background-color: white;
        }
      `}</style>
    </div>
  )
}

export default KarnatakaMap
