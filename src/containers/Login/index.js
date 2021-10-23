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
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { NOT_LOGGED } from "../../config/globalVariables";
import { useStyles } from "./styles";

export default function LoginView() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassowrd] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (
      localStorage.getItem("uid") != null &&
      localStorage.getItem("uid") != NOT_LOGGED
    ) {
      history.push("/Inicio");
      window.location.reload();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setLoginError("Completar todos los campos para iniciar sesión");
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
          console.log(response);
          localStorage.setItem("token", headers["access-token"]);
          localStorage.setItem("client", headers.client);
          localStorage.setItem("uid", headers.uid);
          window.location.reload(); // header gets updated
          history.push("/Inicio");
          window.location.reload();

          setLoginError("");
        })
        .catch((error) => {
          setPassowrd("");
          if (error.response != undefined && error.response.status == 401)
            setLoginError("El usuario y/o contraseña ingresado no es correcto");
          else setLoginError("Error inesperado al iniciar sesión");
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
      <Grid item md={3} sm={12}>
        {/* <Paper variant="elevation" elevation={3} className="login-background" style={{ marginTop: 100 }}> */}
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <span className={classes.imgcontainer}>
            <img
              src={effectus_wallpaper}
              alt="effectus wallpaper"
              width="27%"
            />
          </span>
          <Login
            onSubmit={(e) => handleSubmit(e)}
            onInputChange={(e) => checkInput(e)}
            email={email}
            password={password}
            error={loginError}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
