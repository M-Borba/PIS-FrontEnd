import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

it("renders correctly unloged", () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  // Matches the last snapshot taken
  expect(container).toMatchSnapshot();
});

it("renders and redirects when loged", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const history = createMemoryHistory();
  localStorage.setItem("token", "fake-token");
  localStorage.setItem("client", "fake-client");
  localStorage.setItem("uid", "fake@uid.com");
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

  fireEvent.click(screen.getByText("Inicio"));
  expect(history.push).toHaveBeenCalledWith("/inicio");

  fireEvent.click(screen.getByText("Personas"));
  expect(history.push).toHaveBeenCalledWith("/personas");

  fireEvent.click(screen.getByText("Cerrar Sesión"));

  expect(history.push).toHaveBeenCalledWith("/login");
});
