import axios from "axios";
import { BACKEND_HOST } from "./globalVariables";

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_HOST}/api`,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const setHeaders = (token) => {
  localStorage.setItem("token", token);
  Object.assign(axiosInstance.defaults, {
    headers: { authorization: `Bearer ${token}` },
  });
};
