/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";
afterEach(cleanup);
/*
  We import the component that we are testing
*/

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });


});