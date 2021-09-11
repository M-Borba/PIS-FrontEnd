import axios from "axios";
import { BACKEND_HOST } from "./globalVariables";

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_HOST}/api/v1`,
  headers: {
    accept: "application/json",
    "access-token": localStorage.getItem("token"),
    uid: localStorage.getItem("uid"),
    client: localStorage.getItem("client"),
  },
});
