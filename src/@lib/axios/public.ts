import { AxiosRequestConfig } from "axios";
import { axiosPublicConfig } from "./config/publicAxios.config";
import { RequestParams } from "./types/requestParams.type";

const PUBLIC_API = {
  get,
  post,
  put,
  patch,
  del
};

function get<T>(params: AxiosRequestConfig): Promise<T> {
  return axiosPublicConfig<T>({
    ...params
  }).then((res) => res.data);
}

function post<T>({ method, ...params }: AxiosRequestConfig): Promise<T> {
  return axiosPublicConfig<T>({
    method: "POST",
    ...params
  }).then((res) => res.data);
}

function put<T>(params: RequestParams): Promise<T> {
  return axiosPublicConfig<T>({
    url: params.url,
    method: "PUT",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function patch<T>(params: RequestParams): Promise<T> {
  return axiosPublicConfig<T>({
    url: params.url,
    method: "PATCH",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function del<T>(params: RequestParams): Promise<T> {
  return axiosPublicConfig<T>({
    url: params.url,
    method: "DELETE",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

export default PUBLIC_API;
