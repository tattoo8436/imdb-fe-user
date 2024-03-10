import axios from "axios";
import { toast } from "react-toastify";

const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(
      localStorage.getItem("account") ?? "{}"
    ).accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosAuth;
