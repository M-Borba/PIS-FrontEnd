import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterMoment";
import { ThemeProvider as ThemeProviderV4 } from "@material-ui/core/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import PersonView from "./containers/PersonView";
import ProjectView from "./containers/ProjectView";
import Project from "./containers/Project";
import { NOT_LOGGED } from "./config/globalVariables";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch as SwitchRouter,
} from "react-router-dom";
import LoginView from "./containers/Login";
import Header from "./components/Header";
import ListarAdministradores from "./containers/ListarAdministradores";
import ListarPersonas from "./containers/ListarPersonas";
import ListarProyectos from "./containers/ListarProyectos";
import "./App.css";
import theme from "./config/theme";
import themeV4 from "./config/themeV4";

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = NOT_LOGGED;
  }
  const [isProjectView, setIsProjectView] = useState(false);
  const onSwitch = () => {
    setIsProjectView(!isProjectView);
  };

  return (
    <ThemeProviderV4 theme={themeV4}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Router>
            <Route
              render={({ location }) =>
                !["/login", "/Login"].includes(location.pathname) && <Header />
              }
            />
            <SwitchRouter>
              <Route path="/login" component={LoginView} />
              {uid === NOT_LOGGED && <Redirect to="/login" />}
              <Route path="/personas" component={ListarPersonas} />
              <Route path="/proyecto/:id" component={Project} />
              <Route path="/proyectos" component={ListarProyectos} />
              <Route
                path="/administradores"
                component={ListarAdministradores}
              />
              <Route path={["/", "/inicio"]}>
                <>
                  <PersonView
                    onSwitch={onSwitch}
                    isProjectView={isProjectView}
                  />
                  <ProjectView
                    onSwitch={onSwitch}
                    isProjectView={isProjectView}
                  />
                </>
              </Route>
            </SwitchRouter>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeProviderV4>
  );
}
