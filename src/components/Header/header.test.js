import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

it("navigates Login when you click", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const history = createMemoryHistory();
  // Render app
  const { container } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  // mock push function
  history.push = jest.fn();

  // Matches the last snapshot taken
  expect(container).toMatchSnapshot();

  fireEvent.click(screen.getByText("Iniciar Sesión"));

  expect(history.push).toHaveBeenCalledWith("/login");

  // TODO: test when logged in
  // fireEvent.click(screen.getByText("Inicio"));
  // expect(history.push).toHaveBeenCalledWith('/Inicio');

  // fireEvent.click(screen.getByText("Personas"));
  // expect(history.push).toHaveBeenCalledWith('/');

  // fireEvent.click(screen.getByText("Administradores"));
  // expect(history.push).toHaveBeenCalledWith('/');

  // fireEvent.click(screen.getByText("Cerrar Sesion"));

  // expect(history.push).toHaveBeenCalledWith('/login');
});
