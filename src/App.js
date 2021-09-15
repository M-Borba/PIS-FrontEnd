import React, { useState } from "react";
import PersonView from "./containters/PersonView";
import ProjectView from "./containters/ProjectView";
import { NOT_LOGGED } from "./config/globalVariables";

import {
  BrowserRouter as Router,
  Switch as SwitchRouter,
  Route,
  Redirect,
} from "react-router-dom";
import LoginView from "./containters/Login";
import Header from "./components/Header";

import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = NOT_LOGGED;
  }
  const [isProjectView, setIsProjectView] = useState(true);

  return (
    <Router>
      <div>
        <Header />
        <SwitchRouter>
          <Route path="/login" component={LoginView} />

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
