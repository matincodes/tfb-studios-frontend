import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  // The `baseURL` will be the URL of your backend.
  // It's best to use an environment variable for this.
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // `withCredentials` is crucial for sending cookies with cross-origin requests,
  // although we primarily rely on the proxy for client-side calls.
  withCredentials: true,
});

export default api;