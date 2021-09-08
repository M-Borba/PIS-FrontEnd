import axios from "axios";
import { BACKEND_HOST } from "./globalVariables";

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_HOST}/api/v1`,
  headers: {
    Accept: "application/json",
  },
});

export const setHeaders = (token, client, uid) => {
  axiosInstance.defaults.headers["access-Token"] = token;
  axiosInstance.defaults.headers["client"] = client;
  axiosInstance.defaults.headers["uid"] = uid;
  console.log("setting headers");
  console.log(axiosInstance.defaults.headers);
};
