import { AuthService } from './AuthService';
import axios from 'axios';

// ----- Axios interceptor to configure all requests -----
axios.interceptors.request.use(async (config) => {
  // configure baseURL
  const API_URL = import.meta.env.VITE_API_URL as string;
  config.baseURL = API_URL;

  // add access token if present
  const token = AuthService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
