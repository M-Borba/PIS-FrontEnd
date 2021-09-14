import React from "react";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";

test("Logout button renders with correct text", () => {
  localStorage.setItem("uid", "Test");
  const { getByTestId } = render(<App />);
  const logoutButton = getByTestId("logout");

  expect(logoutButton.textContent).toBe("Cerrar Sesion");
  localStorage.removeItem("uid");
});

test("Logout button redirect to /Logout and remove token from local storage", () => {
  localStorage.setItem("uid", "Test");
  localStorage.setItem("client", "Test");
  localStorage.setItem("token", "Test");
  const { getByTestId } = render(<App />);
  const logoutButton = getByTestId("logout");

  fireEvent.click(logoutButton);

  expect(location.pathname).toBe("/Logout");
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
