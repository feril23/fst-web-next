import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  timeout: 10000, // Timeout 10 detik
});

// Interceptor untuk logging atau token auth
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;

