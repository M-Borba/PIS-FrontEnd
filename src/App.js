import React, { useState } from "react";
import PersonView from "./containters/PersonView";
import ProjectView from "./containters/ProjectView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginView from "./containters/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route /* Link */,
} from "react-router-dom";

export default function App() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const [username] = useState(uid);

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Linea de tiempo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Proyectos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Personas
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Administradores
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              <a className="navbar-brand" href="#">
                Perfil
              </a>
            </div>
          </div>
        </nav>
        {/* <nav>
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
            {uid == "Aún no inició sesión" ? (
              <li>
                <Link to="/Login">Iniciar Sesion</Link>
              </li>
            ) : (
              <li>
                <Link to="/Logout" onClick={Logout}>
                  Cerrar Sesion
                </Link>
              </li>
            )}
          </ul>
<<<<<<< HEAD
          {username}
        </nav>

=======
        </nav> */}
>>>>>>> ca10cf09... Header style
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
