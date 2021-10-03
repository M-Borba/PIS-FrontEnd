import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import CreateProject from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const resultOk = () => { };
    const div = document.createElement("div");
    ReactDOM.render(<CreateProject resultOk={resultOk} />, div);
  });
  it("renders correct data", () => {
    const resultOk = () => { };
    const { container } = render(<CreateProject resultOk={resultOk} />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
