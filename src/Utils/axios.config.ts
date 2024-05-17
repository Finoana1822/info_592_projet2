import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URI,
});
const getToken = () => localStorage.getItem("token") as string;
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export { instance, getToken };
