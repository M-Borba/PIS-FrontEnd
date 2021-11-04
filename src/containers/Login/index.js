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
import ChangePassword from "../../components/LoginChangePassword";
import effectus_wallpaper from "../../resources/effectus_wallpaper.png";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { NOT_LOGGED } from "../../config/globalVariables";
import { useStyles } from "./styles";

export default function LoginView() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState({});
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [needsPasswordReset, setPasswordReset] = useState(false);
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [client, setClient] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("uid") != null &&
      localStorage.getItem("uid") != NOT_LOGGED &&
      !needsPasswordReset
    ) {
      history.push("/Inicio");
      window.location.reload();
    }
  }, [needsPasswordReset]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/users/sign_in", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        const headers = response.headers;
        console.log(response);
        localStorage.setItem("token", headers["access-token"]);
        localStorage.setItem("client", headers["client"]);
        localStorage.setItem("uid", headers["uid"]);
        history.push("/Inicio");
      })
      .catch((error) => {
        if (error.response?.data?.needs_password_reset == true) {
          const headers = error.response.headers;
          setToken(headers["access-token"]);
          setUid(headers.uid);
          setClient(headers.client);
          // localStorage.setItem("token", headers["access-token"]);
          // localStorage.setItem("client", headers.client);
          // localStorage.setItem("uid", headers.uid);
          setPassword("");
          setPasswordReset(true);
        } else {
          setLoginError(error.response?.data?.errors);
        }
      });
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    // const uid = localStorage.getItem("uid");
    // const client = localStorage.getItem("client");
    localStorage.setItem("token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
    axiosInstance
      .put(
        "/users/password",
        {
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            accept: "application/json",
            "access-token": token,
            uid: uid,
            client: client,
            "Access-Control-Expose-Headers": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        history.push("/Inicio");
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        setLoginError(error.response?.data?.errors);
      });
  };

  const checkInput = (e) => {
    setLoginError({});
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
    if (e.target.name == "passwordConfirmation")
      setPasswordConfirmation(e.target.value);
  };
  if (!needsPasswordReset)
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
              onSubmit={(e) => handleLoginSubmit(e)}
              onInputChange={(e) => checkInput(e)}
              email={email}
              password={password}
              errors={loginError}
            />
          </Box>
        </Paper>
      </Box>
    );
  else
    return (
      <Box className={classes.container}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              className={classes.imgcontainer}
              src={effectus_wallpaper}
              alt="Logo"
            />
            <ChangePassword
              onSubmit={(e) => handlePasswordChangeSubmit(e)}
              onInputChange={(e) => checkInput(e)}
              password={password}
              passwordConfirmation={passwordConfirmation}
              errors={loginError}
            />
          </Box>
        </Paper>
      </Box>
    );
}
