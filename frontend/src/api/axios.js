import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
