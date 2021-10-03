import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import Edit from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const pData = {
      first_name: "A",
      last_name: "B",
      email: "A@effectus.com",
      working_hours: 40,
    };
    const div = document.createElement("div");
    ReactDOM.render(<Edit personData={pData} id={1} true />, div);
  });
  it("renders correct data", () => {
    const pData = {
      first_name: "A",
      last_name: "B",
      email: "A@effectus.com",
      working_hours: 40,
    };
    const { container } = render(<Edit personData={pData} id={1} true />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
