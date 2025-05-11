import axios from "axios";

export const myApiConfig = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  timeout: 40 * 1000, // Thời gian chờ tối đa (40 giây)
  headers: {
    "Content-Type": "application/json", // Định dạng JSON mặc định
  },
});

myApiConfig.interceptors.request.use(async (config) => {
  // console log current route

  return config;
});
