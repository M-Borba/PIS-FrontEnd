import axios from "axios";
import { BACKEND_HOST, NOT_LOGGED } from "./globalVariables";

const instance = axios.create({
  baseURL: `${BACKEND_HOST}/api/v1`,
  headers: {
    accept: "application/json",
    "access-token": localStorage.getItem("token"),
    uid: localStorage.getItem("uid"),
    client: localStorage.getItem("client"),
    "Access-Control-Expose-Headers": "*",
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("uid", NOT_LOGGED);
      if (window.location.pathname !== "/login") window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export const axiosInstance = instance;
