import Axios, { AxiosRequestConfig } from "axios";

import { getApiHost } from "../../services/HostService/HostService";

export interface IRequest {
  url: string;
  body?: any;
  config?: AxiosRequestConfig;
}

Axios.interceptors.request.use((config) => {
  //const token = window.localStorage.getItem("token");

  const user = JSON.parse(window.localStorage.getItem("user") ?? "{}") 

  if (user.token) config.headers.Authorization = user.token;



 // const user = JSON.parse(window.localStorage.getItem("user") ?? "{}") as LoginValues;

  //if (!user || !user.token) return false;


  return config;
});

const Api = {
  get: ({ url }: IRequest): Promise<any> => Axios.get(`${getApiHost()}${url}`),

  post: ({ url, body, config }: IRequest): Promise<any> =>
    Axios.post(`${getApiHost()}${url}`, body, config),

  put: ({ url, body }: IRequest): Promise<any> => Axios.put(`${getApiHost()}${url}`, body),

  delete: ({ url }: IRequest): Promise<any> => Axios.delete(`${getApiHost()}${url}`),
};

export default Api;
