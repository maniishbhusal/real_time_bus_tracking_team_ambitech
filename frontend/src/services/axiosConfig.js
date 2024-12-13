import axios from 'axios';

const baseURL = 'http://localhost:5055';

const axiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor if needed
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens or other headers here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Add response interceptor if needed
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Handle errors globally
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
