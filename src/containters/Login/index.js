/**
 * Login
 *
 * This container uses the backend api
 * to autenticate.
 *
 */

import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import Login from "../../components/Login";
import Grid from "@material-ui/core/Grid";
import effectus_wallpaper from "../../resources/effectus_wallpaper.png";
import { useHistory } from "react-router-dom";
import { NOT_LOGGED } from "../../config/globalVariables";

export default function LoginView() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("uid") != null &&
      localStorage.getItem("uid") != NOT_LOGGED
    ) {
      history.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Completar todos los campos para iniciar sesión");
    } else {
      axiosInstance
        .post("/users/sign_in", {
          user: {
            email: email,
            password: password,
          },
        })
        .then((response) => {
          let headers = response.headers;
          localStorage.setItem("token", headers["access-token"]);
          localStorage.setItem("client", headers.client);
          localStorage.setItem("uid", headers.uid);
          axiosInstance.defaults.headers["access-Token"] =
            headers["access-token"];
          axiosInstance.defaults.headers["client"] = headers.client;
          axiosInstance.defaults.headers["uid"] = headers.client;
          //history.push("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log("bug");
          console.log(error);
        });
      console.log("asdasdasdas");
    }
  };
  const checkInput = (e) => {
    e.preventDefault();
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassowrd(e.target.value);
  };
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item md={7} sm={12}>
        <img
          src={effectus_wallpaper}
          className="logo"
          alt="effectus wallpaper"
          width="100%"
        />
      </Grid>
      <Grid item md={5} sm={12}>
        <Login
          onSubmit={(e) => handleSubmit(e)}
          onInputChange={(e) => checkInput(e)}
          email={email}
          password={password}
        />
      </Grid>
    </Grid>
  );
}
