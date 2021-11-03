import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FilterForm from "./index";
import React from "react";

describe("login component tests", () => {
  it("renders correctly", () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const { container } = render(
      <FilterForm onSubmit={(e) => mockSubmit(e)} />
    );
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
    // calls both functions
    fireEvent(screen.getByRole("submit"), new MouseEvent("click"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
