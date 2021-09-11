import { render, screen, expect } from "@testing-library/react";
import Login from "./index";
import React from 'react'


describe('login component tests', () => {

    it('renders correctly', () => {
        const { container } = render(<Button text="hello" />);
        expect(container.firstChild).toHaveStyleRule('background-color', 'lightblue');
        expect(screen.getByRole('button', { name: 'hello' })).not.toBeNull();
        // snapshot test
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders primary button styles correctly', () => {
        const { container } = render(<Button action="primary" />);
        expect(container.firstChild).toHaveStyleRule('background-color', '#ff3d61');
    });




});


test("renders login", () => {
    const mockSubmit = jest.fn(e => { return });
    const mockInputChange = jest.fn(e => { return });
    let email = ""
    let password = ""
    render(<Login
        onSubmit={(e) => mockSubmit(e)}
        onInputChange={(e) => mockInputChange(e)}
        email={email}
        password={password}
        error={"No se pudo iniciar sesión"}
    />);
    // email = "example@effectus.com"
    // expect(mockInputChange).toHaveBeenCalled();
    // const linkElement = screen.getByText("No se pudo iniciar sesión");
    // expect(linkElement).toBeInTheDocument();
});
