// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { useBusLocations } from "../../context/BusLocationContext";

// // Enhanced SVG Bus icon with modern design
// const svgIcon = `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
//   <defs>
//     <!-- Gradient for Bus Body -->
//     <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#3B82F6" />
//       <stop offset="100%" stop-color="#1D4ED8" />
//     </linearGradient>
//     <!-- Glass Gradient -->
//     <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//       <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
//       <stop offset="100%" stop-color="white" stop-opacity="0.4"/>
//     </linearGradient>
//     <!-- Glow Effect -->
//     <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//       <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
//       <feMerge>
//         <feMergeNode in="coloredBlur"/>
//         <feMergeNode in="SourceGraphic"/>
//       </feMerge>
//     </filter>
//   </defs>

//   <!-- Main Bus Body -->
//   <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z"
//         fill="url(#busBodyGradient)"/>

//   <!-- Windows -->
//   <g>
//     <rect x="80" y="160" width="352" height="96" fill="url(#glassGradient)" rx="12"/>
//   </g>

//   <!-- Wheels -->
//   <circle cx="128" cy="384" r="32" fill="black"/>
//   <circle cx="384" cy="384" r="32" fill="black"/>

//   <!-- Headlights with Glow -->
//   <g filter="url(#glow)">
//     <circle cx="80" cy="352" r="8" fill="#FDE047"/>
//     <circle cx="432" cy="352" r="8" fill="#FDE047"/>
//   </g>
// </svg>
// `;

// // Convert SVG to base64 URL
// const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

// // Create custom bus icon
// const busIcon = new L.Icon({
//   iconUrl: svgUrl,
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
//   popupAnchor: [0, -20],
//   className:
//     "bus-marker hover:shadow-lg hover:cursor-pointer transition-transform duration-300 ease-in-out",
// });

// export function MapPlaceholder() {
//   const [center] = useState([27.7172, 85.324]); // Kathmandu coordinates
//   const { buses, loading, error } = useBusLocations();

//   if (error) {
//     return (
//       <div className="h-full w-full flex items-center justify-center bg-red-50">
//         <div className="text-red-600">
//           Error connecting to real-time updates. Please refresh the page.
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="h-full w-full flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full">
//       <style>{`
//         .bus-marker {
//           filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));
//           transition: all 0.3s ease-in-out;
//         }
//         .bus-marker:hover {
//           filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.3));
//           transform: translateY(-2px) scale(1.1);
//         }
//       `}</style>

//       <MapContainer
//         center={center}
//         zoom={13}
//         className="h-full w-full"
//         zoomControl={false}
//       >
//         {/* <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         /> */}
//         <TileLayer
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           // attribution="&copy; ESRI"
//           maxZoom={19}
//         />

//         {buses.map((bus) => (
//           <Marker key={bus.id} position={bus.position} icon={busIcon}>
//             <Popup className="rounded-lg shadow-lg">
//               <div className="p-2">
//                 <h3 className="font-medium">Bus {bus.registrationNumber}</h3>
//                 <p className="text-sm text-gray-600">Route: {bus.routeName}</p>
//                 <p className="text-sm text-slate-500">
//                   Last updated: {bus.lastUpdate}
//                 </p>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default MapPlaceholder;

// ------------------------------------------
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// // Bus icon
// const svgIcon = `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
//   <defs>
//     <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#3B82F6" />
//       <stop offset="100%" stop-color="#1D4ED8" />
//     </linearGradient>
//   </defs>
//   <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z" fill="url(#busBodyGradient)"/>
//   <circle cx="128" cy="384" r="32" fill="black"/>
//   <circle cx="384" cy="384" r="32" fill="black"/>
// </svg>
// `;
// const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;
// const busIcon = new L.Icon({
//   iconUrl: svgUrl,
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
//   popupAnchor: [0, -20],
// });

// // Map Component
// const MapPlaceholder = () => {
//   const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
//   const [routeData, setRouteData] = useState(null);
//   const [busPosition, setBusPosition] = useState(null);

//   const speedKmh = 15; // 15 km/h

//   useEffect(() => {
//     // Fetch route data
//     const fetchRouteData = async () => {
//       try {
//         const response = await fetch("http://localhost:5055/api/route");
//         const data = await response.json();
//         setRouteData(data);

//         // Start simulation
//         startSimulation(data.busCheckpoints);
//       } catch (error) {
//         console.error("Error fetching route data:", error);
//       }
//     };

//     fetchRouteData();
//   }, []);

//   const startSimulation = (checkpoints) => {
//     let currentCheckpoint = 0;
//     let distanceCovered = 0; // in km

//     const interval = setInterval(() => {
//       if (currentCheckpoint >= checkpoints.length - 1) {
//         clearInterval(interval);
//         return;
//       }

//       const start = checkpoints[currentCheckpoint];
//       const end = checkpoints[currentCheckpoint + 1];
//       const segmentDistance = end.distanceFromPrevious;

//       const timeToNextCheckpoint = (segmentDistance / speedKmh) * 3600; // in seconds
//       const progress = (distanceCovered / segmentDistance) || 0;

//       // Interpolate position
//       const newLat =
//         start.latitude + progress * (end.latitude - start.latitude);
//       const newLng =
//         start.longitude + progress * (end.longitude - start.longitude);

//       setBusPosition([newLat, newLng]);

//       // Update distance
//       distanceCovered += (speedKmh / 3600) * 1; // Update for each second

//       if (distanceCovered >= segmentDistance) {
//         currentCheckpoint++;
//         distanceCovered = 0;
//       }
//     }, 1000); // Update every second
//   };

//   if (!routeData) {
//     return  <div className="h-full w-full bg-gray-100 animate-pulse">
//     <div className="h-full w-full flex items-center justify-center">
//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//         <div className="h-2 w-48 bg-gray-200 rounded"></div>
//         <div className="h-2 w-32 bg-gray-200 rounded"></div>
//       </div>
//     </div>
//   </div>;
//   }

//   return (
//     <div className="h-full w-full">
//       <MapContainer
//         center={center}
//         zoom={14}
//         className="h-full w-full"
//         zoomControl={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Render Bus Marker */}
//         {busPosition && (
//           <Marker position={busPosition} icon={busIcon}>
//             <Popup>Bus is here!</Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPlaceholder;

// ------------------------

// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";

// // Bus icon
// const svgIcon = ` 
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
//   <defs>
//     <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#3B82F6" />
//       <stop offset="100%" stop-color="#1D4ED8" />
//     </linearGradient>
//   </defs>
//   <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z" fill="url(#busBodyGradient)"/>
//   <circle cx="128" cy="384" r="32" fill="black"/>
//   <circle cx="384" cy="384" r="32" fill="black"/>
// </svg>
// `;
// const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;
// const busIcon = new L.Icon({
//   iconUrl: svgUrl,
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
//   popupAnchor: [0, -20],
// });

// // Map Component
// const MapPlaceholder = () => {
//   const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
//   const [routeData, setRouteData] = useState(null);
//   const [busPosition, setBusPosition] = useState(null);

//   const speedKmh = 15; // 15 km/h

//   useEffect(() => {
//     // Fetch route data
//     const fetchRouteData = async () => {
//       try {
//         const response = await fetch("http://localhost:5055/api/route");
//         const data = await response.json();
//         setRouteData(data);

//         // Start simulation
//         startSimulation(data.busCheckpoints);
//       } catch (error) {
//         console.error("Error fetching route data:", error);
//       }
//     };

//     fetchRouteData();
//   }, []);

//   const startSimulation = (checkpoints) => {
//     let pathPoints = []; // All path points for the route
//     // Collect all PathPoints
//     checkpoints.forEach((checkpoint) => {
//       pathPoints = [...pathPoints, ...checkpoint.pathToNext];
//     });

//     let currentPointIndex = 0; // Track the current path point
//     let distanceCovered = 0; // in km

//     const interval = setInterval(() => {
//       if (currentPointIndex >= pathPoints.length - 1) {
//         clearInterval(interval);
//         return;
//       }

//       const start = pathPoints[currentPointIndex];
//       const end = pathPoints[currentPointIndex + 1];

//       // Calculate the distance between the current point and next point (in km)
//       const segmentDistance = getDistance(start, end);

//       // Time to cover the segment in seconds
//       const timeToNextPoint = (segmentDistance / speedKmh) * 3600; // seconds

//       distanceCovered += speedKmh / 3600; // Update distance covered for every second

//       let progress = distanceCovered / segmentDistance;
//       if (progress > 1) {
//         progress = 1;
//       }

//       // Interpolate the bus position
//       const newLat =
//         start.latitude + progress * (end.latitude - start.latitude);
//       const newLng =
//         start.longitude + progress * (end.longitude - start.longitude);

//       setBusPosition([newLat, newLng]);

//       // If the distance covered is greater than or equal to the segment distance, move to the next point
//       if (distanceCovered >= segmentDistance) {
//         currentPointIndex++;
//         distanceCovered = 0;
//       }
//     }, 1000); // Update every second
//   };

//   // Function to calculate distance between two points in km
//   const getDistance = (point1, point2) => {
//     const radian = Math.PI / 180;
//     const lat1 = point1.latitude * radian;
//     const lon1 = point1.longitude * radian;
//     const lat2 = point2.latitude * radian;
//     const lon2 = point2.longitude * radian;

//     const dLat = lat2 - lat1;
//     const dLon = lon2 - lon1;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const radius = 6371; // Earth radius in km

//     return radius * c; // Distance in km
//   };

//   // Generate polyline path for the route
//   const getPolylinePath = () => {
//     if (!routeData) return [];

//     const polylinePath = [];
//     routeData.busCheckpoints.forEach((checkpoint) => {
//       polylinePath.push([checkpoint.latitude, checkpoint.longitude]);
//       checkpoint.pathToNext.forEach((pathPoint) =>
//         polylinePath.push([pathPoint.latitude, pathPoint.longitude])
//       );
//     });

//     return polylinePath;
//   };

//   if (!routeData) {
//     return (
//       <div className="h-full w-full bg-gray-100 animate-pulse">
//         <div className="h-full w-full flex items-center justify-center">
//           <div className="flex flex-col items-center space-y-4">
//             <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//             <div className="h-2 w-48 bg-gray-200 rounded"></div>
//             <div className="h-2 w-32 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full">
//       <MapContainer
//         center={center}
//         zoom={14}
//         className="h-full w-full"
//         zoomControl={false}
//       >
//         {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Render Route Line */}
//         <Polyline
//           positions={getPolylinePath()}
//           color="blue"
//           weight={5}
//           opacity={0.7}
//         />

//         {/* Render Bus Marker */}
//         {busPosition && (
//           <Marker position={busPosition} icon={busIcon}>
//             <Popup>Bus is here!</Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPlaceholder;

// -------------------------------------------
// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import L from "leaflet";
// import DriverControls from "../DriverControls";


// // Bus icon
// const svgIcon = `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
//   <defs>
//     <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#3B82F6" />
//       <stop offset="100%" stop-color="#1D4ED8" />
//     </linearGradient>
//   </defs>
//   <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z" fill="url(#busBodyGradient)"/>
//   <circle cx="128" cy="384" r="32" fill="black"/>
//   <circle cx="384" cy="384" r="32" fill="black"/>
// </svg>
// `;
// const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;
// const busIcon = new L.Icon({
//   iconUrl: svgUrl,
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
//   popupAnchor: [0, -20],
// });

// // Map Component
// const MapPlaceholder = () => {
//   const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
//   const [routeData, setRouteData] = useState(null);
//   const [busPosition, setBusPosition] = useState(null);
//   const [simulationInterval, setSimulationInterval] = useState(null);

//   const speedKmh = 15; // 15 km/h

//   useEffect(() => {
//     // Fetch route data
//     const fetchRouteData = async () => {
//       try {
//         const response = await fetch("http://localhost:5055/api/route");
//         const data = await response.json();
//         setRouteData(data);
//       } catch (error) {
//         console.error("Error fetching route data:", error);
//       }
//     };

//     fetchRouteData();
//   }, []);

//   // Modified to handle start/stop simulation
//   const handleLocationToggle = (isActive) => {
//     if (isActive) {
//       startSimulation(routeData.busCheckpoints);
//     } else {
//       // Stop simulation
//       if (simulationInterval) {
//         clearInterval(simulationInterval);
//         setSimulationInterval(null);
//       }
//       setBusPosition(null);
//     }
//   };

//   const startSimulation = (checkpoints) => {
//     let pathPoints = [];
//     checkpoints.forEach((checkpoint) => {
//       pathPoints = [...pathPoints, ...checkpoint.pathToNext];
//     });

//     let currentPointIndex = 0;
//     let distanceCovered = 0;

//     // Store interval ID to clear it later
//     const interval = setInterval(() => {
//       if (currentPointIndex >= pathPoints.length - 1) {
//         currentPointIndex = 0; // Reset to start of route
//         distanceCovered = 0;
//         return;
//       }

//       const start = pathPoints[currentPointIndex];
//       const end = pathPoints[currentPointIndex + 1];
//       const segmentDistance = getDistance(start, end);

//       distanceCovered += speedKmh / 3600;

//       let progress = distanceCovered / segmentDistance;
//       if (progress > 1) {
//         progress = 1;
//       }

//       const newLat = start.latitude + progress * (end.latitude - start.latitude);
//       const newLng = start.longitude + progress * (end.longitude - start.longitude);

//       setBusPosition([newLat, newLng]);

//       if (distanceCovered >= segmentDistance) {
//         currentPointIndex++;
//         distanceCovered = 0;
//       }
//     }, 1000);

//     setSimulationInterval(interval);
//   };

//   // Function to calculate distance between two points in km
//   const getDistance = (point1, point2) => {
//     const radian = Math.PI / 180;
//     const lat1 = point1.latitude * radian;
//     const lon1 = point1.longitude * radian;
//     const lat2 = point2.latitude * radian;
//     const lon2 = point2.longitude * radian;

//     const dLat = lat2 - lat1;
//     const dLon = lon2 - lon1;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const radius = 6371; // Earth radius in km

//     return radius * c; // Distance in km
//   };

//   // Generate polyline path for the route
//   const getPolylinePath = () => {
//     if (!routeData) return [];

//     const polylinePath = [];
//     routeData.busCheckpoints.forEach((checkpoint) => {
//       polylinePath.push([checkpoint.latitude, checkpoint.longitude]);
//       checkpoint.pathToNext.forEach((pathPoint) =>
//         polylinePath.push([pathPoint.latitude, pathPoint.longitude])
//       );
//     });

//     return polylinePath;
//   };

//   if (!routeData) {
//     return (
//       <div className="h-full w-full bg-gray-100 animate-pulse">
//         <div className="h-full w-full flex items-center justify-center">
//           <div className="flex flex-col items-center space-y-4">
//             <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//             <div className="h-2 w-48 bg-gray-200 rounded"></div>
//             <div className="h-2 w-32 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       {/* Driver Controls to start/stop the simulation */}
//       <DriverControls onLocationToggle={handleLocationToggle} />

//       <div className="h-[800px] w-full">
//         <MapContainer
//           center={center}
//           zoom={14}
//           className="h-full w-full"
//           zoomControl={false}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Polyline
//             positions={getPolylinePath()}
//             color="blue"
//             weight={5}
//             opacity={0.7}
//           />
//           {busPosition && (
//             <Marker position={busPosition} icon={busIcon}>
//               <Popup>Bus is here!</Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default MapPlaceholder;

// ------------------------------------------------

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import DriverControls from "../DriverControls";
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import LoginPage from "../LoginPage";


// Bus icon SVG and URL
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="64" height="64">
  <defs>
    <linearGradient id="busBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>
  <path d="M48 160 C48 128 64 128 96 128 L416 128 C448 128 464 128 464 160 L464 352 C464 384 448 384 416 384 L96 384 C64 384 48 384 48 352 Z" fill="url(#busBodyGradient)"/>
  <circle cx="128" cy="384" r="32" fill="black"/>
  <circle cx="384" cy="384" r="32" fill="black"/>
</svg>
`;
const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;
const busIcon = new L.Icon({
  iconUrl: svgUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const MapPlaceholder = () => {
  const { isAuthenticated, logout } = useAuth();
  const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
  const [routeData, setRouteData] = useState(null);
  const [busPosition, setBusPosition] = useState(null);
  const [simulationInterval, setSimulationInterval] = useState(null);
  const speedKmh = 15; // 15 km/h

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch("http://localhost:5055/api/route");
        const data = await response.json();
        setRouteData(data);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, []);

  const handleLocationToggle = (isActive) => {
    if (isActive) {
      startSimulation(routeData.busCheckpoints);
    } else {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setBusPosition(null);
    }
  };

  const startSimulation = (checkpoints) => {
    let pathPoints = [];
    checkpoints.forEach((checkpoint) => {
      pathPoints = [...pathPoints, ...checkpoint.pathToNext];
    });

    let currentPointIndex = 0;
    let distanceCovered = 0;

    const interval = setInterval(() => {
      if (currentPointIndex >= pathPoints.length - 1) {
        currentPointIndex = 0;
        distanceCovered = 0;
        return;
      }

      const start = pathPoints[currentPointIndex];
      const end = pathPoints[currentPointIndex + 1];
      const segmentDistance = getDistance(start, end);

      distanceCovered += speedKmh / 3600;

      let progress = distanceCovered / segmentDistance;
      if (progress > 1) {
        progress = 1;
      }

      const newLat = start.latitude + progress * (end.latitude - start.latitude);
      const newLng = start.longitude + progress * (end.longitude - start.longitude);

      setBusPosition([newLat, newLng]);

      if (distanceCovered >= segmentDistance) {
        currentPointIndex++;
        distanceCovered = 0;
      }
    }, 1000);

    setSimulationInterval(interval);
  };

  const getDistance = (point1, point2) => {
    const radian = Math.PI / 180;
    const lat1 = point1.latitude * radian;
    const lon1 = point1.longitude * radian;
    const lat2 = point2.latitude * radian;
    const lon2 = point2.longitude * radian;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius = 6371; // Earth radius in km

    return radius * c;
  };

  const getPolylinePath = () => {
    if (!routeData) return [];
    const polylinePath = [];
    routeData.busCheckpoints.forEach((checkpoint) => {
      polylinePath.push([checkpoint.latitude, checkpoint.longitude]);
      checkpoint.pathToNext.forEach((pathPoint) =>
        polylinePath.push([pathPoint.latitude, pathPoint.longitude])
      );
    });

    return polylinePath;
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (!routeData) {
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="h-2 w-48 bg-gray-200 rounded"></div>
            <div className="h-2 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Button onClick={logout} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Driver Controls */}
      <DriverControls onLocationToggle={handleLocationToggle} />

      <div className="h-[800px] w-full">
        <MapContainer
          center={center}
          zoom={14}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline
            positions={getPolylinePath()}
            color="blue"
            weight={5}
            opacity={0.7}
          />
          {busPosition && (
            <Marker position={busPosition} icon={busIcon}>
              <Popup>Bus is here!</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPlaceholder;
