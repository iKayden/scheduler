import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, queryByText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application Component", () => {

  // Async/Await syntax way of working with promises in async code
  it("changes the schedule when a new day is selected", async () => {
    // The asynchronous function has been defined as one using the async keyword.
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    // The Promise chain can be hidden by using the await keyword.
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    // The asynchronous function has been defined as one using the async keyword.


    // Render the Application. 
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed. 
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // get the empty appointment for our testing
    const appointment = getAllByTestId(container, "appointment")[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // check if the mode === SAVING
    expect(getByText(appointment, "SAVING IN THE PROCESS")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    // check if Monday has "no spots remaining" after booking an interview
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
