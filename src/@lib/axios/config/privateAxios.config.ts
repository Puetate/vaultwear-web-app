import { envs } from "@/@config/envs";
import { useSessionStore } from "@/@stores/session.store";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const axiosPrivateConfig = axios.create({
  baseURL: envs.API_URL,
  withCredentials: true
});

axiosPrivateConfig.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = useSessionStore.getState().session;
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivateConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const previousRequest = error.config;
    let errorMessage: string = "";
    errorMessage =
      error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK"
        ? "Error de conexión, revise su conexión a internet"
        : error.response?.data.error;
    const statusCode = error.response?.status;
    if (statusCode === 401 && !previousRequest.sent) {
      previousRequest.sent = true;
      const { accessToken } = await useSessionStore.getState().refreshTokenSession();
      previousRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosPrivateConfig(previousRequest);
    } else {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);
