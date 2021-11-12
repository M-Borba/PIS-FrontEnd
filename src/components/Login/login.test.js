import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./index";
import React from "react";

describe("login component tests", () => {
  it("renders correctly", () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const mockInputChange = jest.fn((e) => e.preventDefault());
    let email = "";
    let password = "";
    const { container } = render(
      <Login
        onSubmit={(e) => mockSubmit(e)}
        onInputChange={(e) => mockInputChange(e)}
        email={email}
        password={password}
        error={"Identidad o contraseña no válida."}
      />
    );
    //Make sure the error is visible
    expect(
      screen.queryByText("Identidad o contraseña no válida.")
    ).toBeVisible();
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
    // calls both functions
    fireEvent(screen.getByRole("submit"), new MouseEvent("click"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
