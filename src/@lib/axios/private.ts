import { AxiosRequestConfig } from "axios";
import { axiosPrivateConfig } from "./config/privateAxios.config";
import { RequestParams } from "./types/requestParams.type";

const PRIVATE_API = {
  get,
  post,
  put,
  patch,
  del
};

function get<T>(params: AxiosRequestConfig): Promise<T> {
  return axiosPrivateConfig<T>({
    ...params
  }).then((res) => res.data);
}

function post<T>({ method, ...params }: AxiosRequestConfig): Promise<T> {
  return axiosPrivateConfig<T>({
    method: "POST",
    ...params
  }).then((res) => res.data);
}

function put<T>(params: RequestParams): Promise<T> {
  return axiosPrivateConfig<T>({
    url: params.url,
    method: "PUT",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function patch<T>(params: RequestParams): Promise<T> {
  return axiosPrivateConfig<T>({
    url: params.url,
    method: "PATCH",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function del<T>(params: RequestParams): Promise<T> {
  return axiosPrivateConfig<T>({
    url: params.url,
    method: "DELETE",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

export default PRIVATE_API;
