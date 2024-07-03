import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
