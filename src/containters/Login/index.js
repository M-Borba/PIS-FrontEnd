/**
 * Login
 *
 * This container uses the backend api
 * to autenticate.
 *
 */

import React, { useState } from "react";
import { axiosInstance, setHeaders } from "../../config/axios";
import Login from "../../components/Login";
import Grid from "@material-ui/core/Grid";
import effectus_wallpaper from "../../resources/effectus_wallpaper.png";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Completar todos los campos para iniciar sesión");
    } else {
      axiosInstance
        .post(
          "/users/sign_in",
          {
            user: {
              email: email,
              password: password,
            },
          }
        )
        .then((response) => {
          let headers = response.headers;
          setHeaders(headers["access-token"], headers.client, headers.uid);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
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
