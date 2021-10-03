import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import InfoProyecto from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const pData = {
      name: "Nombre",
      description: "Descripcion",
      budget: 400,
    }; //actualizar en el futuro con lista de personas y tecnologias
    const div = document.createElement("div");
    ReactDOM.render(<InfoProyecto projectData={pData} />, div);
  });
  it("renders correct data", () => {
    const pData = {
      name: "Nombre",
      description: "Descripcion",
      budget: 400,
    }; //actualizar en el futuro con lista de personas y tecnologias
    const { container } = render(<InfoProyecto projectData={pData} />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
