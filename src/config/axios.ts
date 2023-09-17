import axios from 'axios';
import { API_URL } from '../../environments';

const axiosInstance = axios.create({
    baseURL: API_URL
})

// axiosInstance.interceptors.request.use(async (config) => {
//     const token = 

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// }, (error) => {
//     return Promise.reject(error)
// })


export default axiosInstance;
