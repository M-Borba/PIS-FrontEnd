import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

describe("header component tests", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
