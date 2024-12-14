// import axiosInstance from './axiosConfig';

// export const busLocationService = {
//     getAllBusLocations: async () => {
//         try {
//             const response = await axiosInstance.get('/api/Location/all');
//             return response.map(bus => ({
//                 id: bus.registrationNumber,
//                 registrationNumber: bus.registrationNumber,
//                 position: [bus.latitude, bus.longitude],
//                 lastUpdate: new Date(bus.timestamp).toLocaleTimeString(),
//                 routeName: bus.routeName
//             }));
//         } catch (error) {
//             console.error('Error fetching bus locations:', error);
//             throw error;
//         }
//     }
// };

