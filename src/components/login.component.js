import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form className="panel">
        <h3>Iniciar Sesion</h3>

        <div className="form-group">
          <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
          {/* bootstrap */}
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese nombre de usuario"
          />
        </div>

        <div className="form-group">
          <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
          {/* bootstrap */}
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese contraseña"
          />
        </div>

        <div className="form-group">
          <div className="custom-control curstom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custim-control-label" htmlFor="customCheck1">
              Recordarme
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Ingresar
        </button>
      </form>
    );
  }
}
