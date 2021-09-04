/**
 * Login
 *
 * This is the container that has all actions and components related
 * to de Login.
 *
 */

import React from "react";
import LoginForm from "../../components/login.component";

export default function LoginView() {
  return (
    <div>
      <header className="top">
        <div className="row">
          <div className="co-sm-4 offset-md-4">
            <h1 className="title">Pagina de Inicio de Sesion</h1>
            <LoginForm></LoginForm>
          </div>
        </div>
      </header>
    </div>
  );
}
