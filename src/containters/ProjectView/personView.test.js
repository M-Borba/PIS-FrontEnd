import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from 'react-dom';
import ProjectView from "./index";
import React from "react";

describe("person timeline component tests", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProjectView />, div);
  });
  it("renders correct data", () => {
    const { container } = render(
      <ProjectView
      />
    );
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
