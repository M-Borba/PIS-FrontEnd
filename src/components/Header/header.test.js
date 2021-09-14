import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import React from "react";

describe("header component tests", () => {
  it("renders correctly", () => {
    const { container } = render(<Header />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
