import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import EliminarProyecto from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const handleClose = () => {};
    const div = document.createElement("div");
    ReactDOM.render(
      <EliminarProyecto
        projectId={1}
        projectName={"Prueba"}
        handleClose={handleClose}
      />,
      div
    );
  });
  it("renders correct data", () => {
    const handleClose = () => {};
    const { container } = render(
      <EliminarProyecto
        projectId={1}
        projectName={"Prueba"}
        handleClose={handleClose}
      />
    );
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
