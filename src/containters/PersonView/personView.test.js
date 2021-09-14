import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from 'react-dom';
import PersonView from "./index";
import React from "react";

describe("person timeline component tests", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PersonView />, div);
  });
  it("renders correct data", () => {
    const { container } = render(
      <PersonView
      />
    );
    // Matches the last snapshot taken
    expect(container).toMatchSnapshot();
  });
});
