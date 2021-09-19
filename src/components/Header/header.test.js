import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import App from "../../App";
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

test("Logout button renders with correct text", () => {
  const history = createMemoryHistory();
  localStorage.setItem("uid", "Test");
  const { getByTestId } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  const logoutButton = getByTestId("logout");

  expect(logoutButton.textContent).toBe("Cerrar Sesión");
  localStorage.removeItem("uid");
});

test("Logout button redirect to /Logout and remove token from local storage", () => {
  const history = createMemoryHistory();
  localStorage.setItem("uid", "Test");
  localStorage.setItem("client", "Test");
  localStorage.setItem("token", "Test");
  const { getByTestId } = render(
    <Router history={history}>
      <Header />
    </Router>
  );
  const logoutButton = getByTestId("logout");

  fireEvent.click(logoutButton);

  expect(location.pathname).toBe("/");
  expect(localStorage.getItem("uid")).toBe(null);
  expect(localStorage.getItem("client")).toBe(null);
  expect(localStorage.getItem("token")).toBe(null);
});

test("The login is rendered after clicking the logout button", () => {
  localStorage.setItem("uid", "Test");
  const component = render(<App />);
  const logoutButton = component.getByTestId("logout");

  fireEvent.click(logoutButton);

  const login = component.getByTestId("login");
  expect(login).toBeInTheDocument();
});
