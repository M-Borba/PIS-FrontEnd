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
import ListarAdministradores from "./containers/ListarAdministradores";
import ListarPersonas from "./containers/ListarPersonas";
import ListarProyectos from "./containers/ListarProyectos";

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
    <Router>
      <div>
        <Route
          render={({ location }) =>
            !["/login", "/Login"].includes(location.pathname) && <Header />
          }
        />
        <SwitchRouter>
          <Route path="/login" component={LoginView} />
          {uid == NOT_LOGGED && <Redirect to="/login" />}
          <Route path="/personas" component={ListarPersonas} />
          <Route path="/proyectos" component={ListarProyectos} />
          <Route path="/administradores" component={ListarAdministradores} />
          <Route path={["/", "/inicio"]}>
            <>
              <PersonView onSwitch={onSwitch} isProjectView={isProjectView} />
              <ProjectView onSwitch={onSwitch} isProjectView={isProjectView} />
            </>
          </Route>
        </SwitchRouter>
      </div>
    </Router>
  );
}
