// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { useSignalR } from '../hooks/useSignalR';
// import { busLocationService } from '../services/busLocationService';

// const BusLocationContext = createContext(null);

// // Named function component for better debugging and Fast Refresh
// function BusLocationProvider({ children }) {
//     const [buses, setBuses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { subscribe, unsubscribe, isConnected, error } = useSignalR('http://localhost:5055/busLocationHub');
//     const initialFetchDone = useRef(false);
    

//     // Handle real-time updates
//     useEffect(() => {
//         if (isConnected) {
//              // This function runs every time we get a new bus location
//             subscribe('ReceiveBusLocation', (busLocation) => {
//                 setBuses(prevBuses => {
//                     const busIndex = prevBuses.findIndex(
//                         bus => bus.registrationNumber === busLocation.busRegistrationNumber
//                     );
                    
//                     const updatedBus = {
//                         id: busLocation.busRegistrationNumber,
//                         registrationNumber: busLocation.busRegistrationNumber,
//                         position: [busLocation.latitude, busLocation.longitude],
//                         lastUpdate: new Date(busLocation.timestamp).toLocaleTimeString(),
//                         routeName: busLocation.routeName || 'Unknown Route'
//                     };

//                     if (busIndex === -1) {
//                         // Bus not found, add it as new
//                         return [...prevBuses, updatedBus];
//                     } else {
//                         // Bus exists, update its position
//                         const newBuses = [...prevBuses];
//                         newBuses[busIndex] = updatedBus;
//                         return newBuses;
//                     }
//                 });
//             });

//             return () => {
//                 unsubscribe('ReceiveBusLocation');
//             };
//         }
//     }, [isConnected, subscribe, unsubscribe]);

//     // Handle initial data fetch
//     useEffect(() => {
//         const fetchInitialData = async () => {
//             if (isConnected && !initialFetchDone.current) {
//                 try {
//                     const formattedBuses = await busLocationService.getAllBusLocations();
//                     setBuses(formattedBuses);
//                     initialFetchDone.current = true;
//                 } catch (err) {
//                     console.error('Error fetching initial bus locations:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchInitialData();
//     }, [isConnected]);

//     const value = {
//         buses,
//         loading,
//         error: error || null
//     };

//     return (
//         <BusLocationContext.Provider value={value}>
//             {children}
//         </BusLocationContext.Provider>
//     );
// }

// // Named function for the hook
// function useBusLocations() {
//     const context = useContext(BusLocationContext);
//     if (!context) {
//         throw new Error('useBusLocations must be used within a BusLocationProvider');
//     }
//     return context;
// }

// export { BusLocationProvider, useBusLocations };
