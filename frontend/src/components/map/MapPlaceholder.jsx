import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useBusLocations } from "../../context/BusLocationContext";

// Enhanced SVG Bus icon with modern design
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
  <defs>
    <!-- Gradient for Bus Body -->
    <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <!-- Glass Gradient -->
    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="white" stop-opacity="0.4"/>
    </linearGradient>
    <!-- Glow Effect -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  
  <!-- Main Bus Body -->
  <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z" 
        fill="url(#busBodyGradient)"/>

  <!-- Windows -->
  <g>
    <rect x="80" y="160" width="352" height="96" fill="url(#glassGradient)" rx="12"/>
  </g>

  <!-- Wheels -->
  <circle cx="128" cy="384" r="32" fill="black"/>
  <circle cx="384" cy="384" r="32" fill="black"/>

  <!-- Headlights with Glow -->
  <g filter="url(#glow)">
    <circle cx="80" cy="352" r="8" fill="#FDE047"/>
    <circle cx="432" cy="352" r="8" fill="#FDE047"/>
  </g>
</svg>
`;

// Convert SVG to base64 URL
const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

// Create custom bus icon
const busIcon = new L.Icon({
  iconUrl: svgUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className:
    "bus-marker hover:shadow-lg hover:cursor-pointer transition-transform duration-300 ease-in-out",
});

export function MapPlaceholder() {
  const [center] = useState([27.7172, 85.324]); // Kathmandu coordinates
  const { buses, loading, error } = useBusLocations();

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-50">
        <div className="text-red-600">
          Error connecting to real-time updates. Please refresh the page.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <style>{`
        .bus-marker {
          filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));
          transition: all 0.3s ease-in-out;
        }
        .bus-marker:hover {
          filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.3));
          transform: translateY(-2px) scale(1.1);
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          // attribution="&copy; ESRI"
          maxZoom={19}
        />

        {buses.map((bus) => (
          <Marker key={bus.id} position={bus.position} icon={busIcon}>
            <Popup className="rounded-lg shadow-lg">
              <div className="p-2">
                <h3 className="font-medium">Bus {bus.registrationNumber}</h3>
                <p className="text-sm text-gray-600">Route: {bus.routeName}</p>
                <p className="text-sm text-slate-500">
                  Last updated: {bus.lastUpdate}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPlaceholder;
