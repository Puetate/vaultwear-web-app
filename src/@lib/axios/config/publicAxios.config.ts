import { envs } from "@/@config/envs";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

export const axiosPublicConfig = axios.create({
  baseURL: envs.API_URL,
  withCredentials: true
});

axiosPublicConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    let errorMessage: string = "";
    errorMessage =
      error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK"
        ? "Error de conexión, revise su conexión a internet"
        : error.response?.data.error;
    const statusCode = error.response?.status;
    if (statusCode !== 401) {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);
