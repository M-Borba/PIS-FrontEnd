import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Personas from "./index";
import React from "react";

describe("personas component tests", () => {
  it("renders correctly", () => {
    const { container } = render(<Personas rows={[]} />);
    expect(container).toMatchSnapshot();
  });
});
