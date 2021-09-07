import React, { useState } from "react";
import PersonView from "./containters/PersonView";
import ProjectView from "./containters/ProjectView";
import { BrowserRouter as Router, Switch as SwitchRouter, Route, Link } from "react-router-dom";
import LoginView from "./containters/Login";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  }
}));

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const [isProjectView, setIsProjectView] = useState(true);
  const [username] = useState(uid);
  const classes = useStyles();

  const Logout = () => {
    // esta funcion debera eliminarse, está hecha a modo de ejemplo y prototipo
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    window.location.reload();
  };

  return (
    <Router>
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Button color="inherit">
                  <Link className={classes.link} to="/">Inicio</Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/">Proyectos</Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/">Personas</Link>
                </Button>
                <Button color="inherit">
                  Administradores
                </Button>
              </Typography>
              <div >
                {uid == "Aún no inició sesión" ? (
                  <Button color="inherit">
                    <Link className={classes.link} to="/Login">Iniciar Sesion</Link>
                  </Button>
                ) : (
                  <>
                    <Button color="inherit">
                      <Link className={classes.link} to="/Logout" onClick={Logout}>Cerrar Sesion</Link>
                    </Button>
                    <Button color="inherit">
                      <Link className={classes.link} to="/">{username}</Link>
                    </Button>
                  </>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <SwitchRouter>
          <Route path="/Personas" component={PersonView} />

          <Route path="/Proyectos" component={ProjectView} />

          <Route path="/Login" component={LoginView} />

          <Route path="/Logout">Hasta la próxima</Route>

          <Route path="/">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              Vista Personas
              <Switch
                color="default"
                checked={isProjectView}
                onChange={() => { setIsProjectView(!isProjectView) }}
              />
              Vista Proyectos
            </Grid>
            {isProjectView ? <ProjectView /> : <PersonView />}
          </Route>
        </SwitchRouter>
      </div>
    </Router>
  );
}
