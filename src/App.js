import React from "react";
import PersonView from "./containters/PersonView";
import ProyectView from "./containters/ProyectView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
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
          </ul>
        </nav>
        <Switch>
          <Route path="/Personas" component={PersonView} />

          <Route path="/Proyectos" component={ProyectView} />

          <Route path="/">Inicio</Route>
        </Switch>
      </div>
    </Router>
  );
}
