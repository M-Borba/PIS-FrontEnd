import React, { useState } from "react";
import PersonView from "./containters/PersonView";
import ProjectView from "./containters/ProjectView";

import {
  BrowserRouter as Router,
  Switch as SwitchRouter,
  Route,
} from "react-router-dom";
import LoginView from "./containters/Login";
import Header from "./components/Header";

import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const [isProjectView, setIsProjectView] = useState(true);

  return (
    <Router>
      <div>
        <Header />
        <SwitchRouter>
          <Route path="/Personas" component={PersonView} />
          <Route path="/Proyectos" component={ProjectView} />
          <Route path="/Inicio">
            <div>
              {uid == "Aún no inició sesión" ? (
                <>Inicia sesion para visualizar la linea de tiempo</>
              ) : (
                <>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    Vista Personas
                    <Switch
                      color="default"
                      checked={isProjectView}
                      onChange={() => {
                        setIsProjectView(!isProjectView);
                      }}
                    />
                    Vista Proyectos
                  </Grid>
                  {isProjectView ? <ProjectView /> : <PersonView />}
                </>
              )}
            </div>
          </Route>
          <Route path="/Login" component={LoginView} />
          <Route path="/" component={LoginView} />
        </SwitchRouter>
      </div>
    </Router>
  );
}
