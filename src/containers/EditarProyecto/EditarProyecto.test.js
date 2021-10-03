import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import EditarProyecto from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const pData = {
      name: "A",
      project_type: "End to End",
      project_state: "Verde",
      description: "",
      budget: 1,
      start_date: "10/10/2021",
      end_date: "11/10/2021",
    };
    const div = document.createElement("div");
    ReactDOM.render(<EditarProyecto projectData={pData} id={1} />, div);
  });
  it("renders correct data", () => {
    const pData = {
      name: "A",
      project_type: "End to End",
      project_state: "Verde",
      description: "",
      budget: 1,
      start_date: "10/10/2021",
      end_date: "11/10/2021",
    };
    const { container } = render(<EditarProyecto projectData={pData} id={1} />);
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
