// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import L from "leaflet";
// import DriverControls from "../DriverControls";
// import { useAuth } from '../../context/AuthContext';
// import { Button } from "@/components/ui/button";
// import { LogOut } from 'lucide-react';
// import LoginPage from "../LoginPage";


// // Bus icon SVG and URL
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

// const MapPlaceholder = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
//   const [routeData, setRouteData] = useState(null);
//   const [busPosition, setBusPosition] = useState(null);
//   const [simulationInterval, setSimulationInterval] = useState(null);
//   const speedKmh = 15; // 15 km/h

//   useEffect(() => {
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

//   const handleLocationToggle = (isActive) => {
//     if (isActive) {
//       startSimulation(routeData.busCheckpoints);
//     } else {
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

//     const interval = setInterval(() => {
//       if (currentPointIndex >= pathPoints.length - 1) {
//         currentPointIndex = 0;
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

//     return radius * c;
//   };

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

//   // if (!isAuthenticated) {
//   //   return <LoginPage />;
//   // }

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
//     <div className="relative">
//       {/* Logout Button */}
//       <div className="absolute top-4 left-4 z-[1000]">
//         <Button onClick={logout} variant="destructive">
//           <LogOut className="mr-2 h-4 w-4" /> Logout
//         </Button>
//       </div>

//       {/* Driver Controls */}
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


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import DriverControls from "../DriverControls";
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Bus, Clock } from 'lucide-react';

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

// User icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#ef4444"/>
      <circle cx="12" cy="12" r="8" fill="#fee2e2"/>
      <circle cx="12" cy="12" r="4" fill="#ef4444"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const MapPlaceholder = () => {
  const { isAuthenticated, logout } = useAuth();
  const [center] = useState([27.66571646592087, 85.32242814531976]); // Lagankhel
  const [routeData, setRouteData] = useState(null);
  const [busPosition, setBusPosition] = useState(null);
  const [simulationInterval, setSimulationInterval] = useState(null);
  const [etas, setEtas] = useState({});
  const speedKmh = 15; // 15 km/h

  // Add waiting users
  const [userLocations] = useState([
    { 
      id: 1,
      position: [27.668205375554003, 85.32166113455261],
      name: "User 1"
    },
    {
      id: 2,
      position: [27.67182727633599, 85.31765358409797],
      name: "User 2"
    }
  ]);

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

  // Calculate ETAs whenever bus position changes
  useEffect(() => {
    if (busPosition) {
      calculateETAs();
    }
  }, [busPosition]);

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

  const calculateETAs = () => {
    const newEtas = {};
    
    userLocations.forEach(user => {
      const distance = getDistance(
        { latitude: busPosition[0], longitude: busPosition[1] },
        { latitude: user.position[0], longitude: user.position[1] }
      );
      
      const timeHours = distance / speedKmh;
      const timeMinutes = Math.round(timeHours * 60);
      newEtas[user.id] = timeMinutes;
    });

    setEtas(newEtas);
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

      {/* ETA Display Card */}
      <div className="absolute top-4 left-3 z-[1000]">
        <Card className="w-64 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">0
                <Bus className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Bus ETAs</h3>
              </div>
              {userLocations.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <span className="text-sm">{user.name}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-6 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {etas[user.id] ? `${etas[user.id]} mins` : 'Arriving Soon...'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
          {/* Add User Markers */}
          {userLocations.map(user => (
            <Marker key={user.id} position={user.position} icon={userIcon}>
              <Popup>{user.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPlaceholder;