import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import EliminarPersona from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const handleClose = () => { };
    const div = document.createElement("div");
    ReactDOM.render(<EliminarPersona personId={1} personName={"Prueba"} handleClose={handleClose} />, div);
  });
  it("renders correct data", () => {
    const handleClose = () => { };
    const { container } = render(<EliminarPersona personId={1} personName={"Prueba"} handleClose={handleClose} />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
