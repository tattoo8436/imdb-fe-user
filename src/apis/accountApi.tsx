import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { IAccountLogin } from "../utils/type";

export const accountApi = {
  login: (payload: IAccountLogin) => {
    return axios.post(`${BASE_URL}/api/accounts/login`, payload);
  },
  register: (payload: IAccountLogin) => {
    return axios.post(`${BASE_URL}/api/accounts/register`, payload);
  },
};
