import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import React from "react";
import { MemoryRouter } from "react-router-dom";
it("navigates home when you click the logo", (async) => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement("div");
  document.body.appendChild(root);

  // Render app
  const { container } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>,
    root
  );
  // Matches the last snapshot taken
  expect(container).toMatchSnapshot();

  fireEvent(screen.getByRole("submit"), new MouseEvent("click"));

  expect(screen.queryByText("No se pudo iniciar sesión")).toBeVisible();
  // Click it
  goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
