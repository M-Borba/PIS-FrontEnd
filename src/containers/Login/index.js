/**
 * Login
 *
 * This container uses the backend api
 * to autenticate.
 *
 */

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { axiosInstance } from "../../config/axios";
import Login from "../../components/Login";
import ChangePassword from "../../components/LoginChangePassword";
import effectus_wallpaper from "../../resources/effectus_wallpaper.png";
import { useHistory } from "react-router-dom";
import { NOT_LOGGED } from "../../config/globalVariables";
import { useStyles } from "./styles";

export default function LoginView() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [needsPasswordReset, setPasswordReset] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (
      localStorage.getItem("uid") !== null &&
      localStorage.getItem("uid") !== undefined &&
      localStorage.getItem("uid") !== NOT_LOGGED &&
      !needsPasswordReset
    ) {
      window.location = "/inicio";
    }
  }, []);

  const signInAndSetHeaders = () =>
    axiosInstance
      .post("/users/sign_in", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        const headers = response.headers;
        localStorage.setItem("token", headers["access-token"]);
        localStorage.setItem("client", headers["client"]);
        localStorage.setItem("uid", headers["uid"]);
        history.push("/Inicio");
      });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    signInAndSetHeaders().catch((error) => {
      if (error.response?.data?.needs_password_reset === true) {
        const headers = error.response.headers;
        localStorage.setItem("token", headers["access-token"]);
        localStorage.setItem("uid", headers.uid);
        localStorage.setItem("client", headers.client);
        setPassword("");
        setPasswordReset(true);
      } else {
        setLoginError(error.response?.data?.error);
      }
    });
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(
        "/users/password",
        {
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
            client: localStorage.getItem("client"),
            uid: localStorage.getItem("uid"),
          },
        }
      )
      .then(() => {
        window.location = "/Inicio";
      })
      .catch((error) => {
        console.error(error.response);
        localStorage.clear();
        setLoginError(error.response?.data?.error);
      });
  };
  const checkInput = (e) => {
    setLoginError("");
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "passwordConfirmation")
      setPasswordConfirmation(e.target.value);
  };
  return (
    <Box className={classes.container}>
      <Paper
        variant="elevation"
        elevation={3}
        classes={{ root: classes.paper }}
        // className={classes.paper}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            className={classes.imgcontainer}
            src={effectus_wallpaper}
            alt="Logo"
          />
          {!needsPasswordReset ? (
            <Login
              onSubmit={(e) => handleLoginSubmit(e)}
              onInputChange={(e) => checkInput(e)}
              email={email}
              password={password}
              error={loginError}
            />
          ) : (
            <ChangePassword
              onSubmit={(e) => handlePasswordChangeSubmit(e)}
              onInputChange={(e) => checkInput(e)}
              password={password}
              passwordConfirmation={passwordConfirmation}
              error={loginError}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
