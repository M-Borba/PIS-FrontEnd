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
    axiosInstance
      .post("/users/sign_in", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        const { headers } = response;
        localStorage.setItem("token", headers["access-token"]);
        localStorage.setItem("client", headers.client);
        localStorage.setItem("uid", headers.uid);
        history.push("/Inicio");
      })
      .catch((error) => {
        setLoginError(error.response?.data?.error);
      });
  };
  const checkInput = (e) => {
    setLoginError("");
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassowrd(e.target.value);
  };
  return (
    <Box className={classes.container}>
      <Paper variant="elevation" elevation={3} className={classes.paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            className={classes.imgcontainer}
            src={effectus_wallpaper}
            alt="Logo"
          />
          <Login
            onSubmit={(e) => handleSubmit(e)}
            onInputChange={(e) => checkInput(e)}
            email={email}
            password={password}
            error={loginError}
          />
        </Box>
      </Paper>
    </Box>
  );
}
