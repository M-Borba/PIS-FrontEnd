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
          <Router>
            <Typography variant="h6" className={classes.title}>
              <Button color="inherit">
                <Link className={classes.link} to="/Inicio">
                  Inicio
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.link} to="/">
                  Proyectos
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.link} to="/">
                  Personas
                </Link>
              </Button>
              <Button color="inherit">Administradores</Button>
            </Typography>
            <div>
              {uid == NOT_LOGGED ? (
                <Button color="inherit">
                  <Link className={classes.link} to="/Login">
                    Iniciar Sesion
                  </Link>
                </Button>
              ) : (
                <>
                  <Button color="inherit">
                    <Link className={classes.link} to="/">
                      {username}
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link
                      className={classes.link}
                      to="/Logout"
                      onClick={Logout}
                    >
                      Cerrar Sesion
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
}
