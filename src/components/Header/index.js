import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NOT_LOGGED } from "../../config/globalVariables";
import { axiosInstance } from "../../config/axios";

export default function Header() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const classes = useStyles();
  const [username] = useState(uid);

  const Logout = () => {
    axiosInstance
      .delete("/users/sign_out")
      .then(() => {
        //logout en la api
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("token"); //borrado local
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {uid == NOT_LOGGED ? (
            <>Inicio de sesión</>
          ) : (
            <>
              <Typography variant="h6" className={classes.title}>
                <Button color="inherit">
                  <Link className={classes.link} to="/inicio">
                    Inicio
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/proyectos">
                    Proyectos
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/personas">
                    Personas
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/">
                    Administradores
                  </Link>
                </Button>
              </Typography>
              <Button color="inherit">
                <Link className={classes.link} to="/">
                  {username}
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.link} to="/login" onClick={Logout}>
                  Cerrar Sesión
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
