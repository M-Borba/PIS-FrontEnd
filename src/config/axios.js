import axios from "axios";
import { BACKEND_HOST } from "./globalVariables";

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_HOST}/api/v1`,
  headers: { Accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },

});

export const setHeaders = (token, client, uid) => {
  localStorage.setItem("token", token);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", uid);
  Object.assign(axiosInstance.defaults, {
    headers: {
      Authorization: `Bearer ${token}`, Client: client, "Access-Token": token, Uid: uid
    },
  });
};
