import React, { useState } from "react";
import PersonView from "./containers/PersonView";
import ProjectView from "./containers/ProjectView";
import { NOT_LOGGED } from "./config/globalVariables";

import {
  BrowserRouter as Router,
  Switch as SwitchRouter,
  Route,
  Redirect,
} from "react-router-dom";
import LoginView from "./containers/Login";
import Header from "./components/Header";
import ListarPersonas from "./containers/ListarPersonas";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import ListarProyectos from "./containers/ListarProyectos";

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = NOT_LOGGED;
  }
  const [isProjectView, setIsProjectView] = useState(false);

  return (
    <Router>
      <div>
        <Route
          render={({ location }) =>
            !["/login", "/Login"].includes(location.pathname) && <Header />
          }
        />
        <SwitchRouter>
          <Route path="/login" component={LoginView} />
          <Route path="/personas" component={ListarPersonas} />
          <Route path="/proyectos" component={ListarProyectos} />
          <Route path={["/", "/inicio"]}>
            <div>
              {uid == NOT_LOGGED ? (
                <Redirect to="/login" />
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
        </SwitchRouter>
      </div>
    </Router>
  );
}
