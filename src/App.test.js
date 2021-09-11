import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders learn react link", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
  expect(linkElement).toBeInTheDocument();
});
