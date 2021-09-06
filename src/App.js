import React, { useState } from "react";
import PersonView from "./containters/PersonView";
import ProyectView from "./containters/ProyectView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginView from "./containters/Login";

export default function App() {
  var uid = localStorage.getItem('uid')
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const [username] = useState(uid)

  const Logout = () => {// esta funcion debera eliminarse, está hecha a modo de ejemplo y prototipo
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    window.location.reload();
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/Personas">Personas</Link>
            </li>

            <li>
              <Link to="/Proyectos">Proyectos</Link>
            </li>
            {uid == "Aún no inició sesión" ?
              <li>
                <Link to="/Login">Iniciar Sesion</Link>
              </li>
              :
              <li>
                <Link to="/Logout" onClick={Logout}>Cerrar Sesion</Link>
              </li>
            }
          </ul>
          {username}

        </nav>

        <Switch>
          <Route path="/Personas" component={PersonView} />

          <Route path="/Proyectos" component={ProyectView} />

          <Route path="/Login" component={LoginView} />

          <Route path="/Logout">Hasta la próxima</Route>

          <Route path="/">Inicio</Route>


        </Switch>
      </div>
    </Router>
  );
}
