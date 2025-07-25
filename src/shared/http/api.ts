import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken } from "../lib/token";
import { redirect } from "next/navigation";

const isServer = typeof window === "undefined";
const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const publicRoutes = [
      "auth/login",
      "auth/register",
    ];

    const fullUrl = new URL(config.url ?? "", config.baseURL).pathname;
    const isPublicRoute = publicRoutes.some((route) => fullUrl.includes(route));

    if (!isPublicRoute) {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      if (isServer) {
        redirect("/auth/login");
      } else if (window.location.pathname !== "/auth/login") {
        window.location.replace("/auth/login");
      }
      const requestConfig = error.config;
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

const api = apiClient;
export default api;
