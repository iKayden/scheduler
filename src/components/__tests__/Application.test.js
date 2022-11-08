import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, queryByText, getByPlaceholderText, getByDisplayValue } from "@testing-library/react";

/* somewhere near the top */
import axios from "axios";

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => queryByText(container, "Archie Cohen"));

    // get the correct appointment
    const appointment = getAllByTestId(container, "appointment")
      .find(app => queryByText(app, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete your appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING APPOINTMENT"));

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same",
    async () => {
      // 1. Render the Application.
      const { container, debug } = render(<Application />);
      // 2. Wait until the text "Archie Cohen" is displayed. (render wait)
      await waitForElement(() => queryByText(container, "Archie Cohen"));
      // 3. get the test appointment
      const appointment = getAllByTestId(container, "appointment")
        .find(app => queryByText(app, "Archie Cohen"));
      // 4. Click the Edit button
      fireEvent.click(getByAltText(appointment, "Edit"));

      // 5. Check the state of dom, and if we can see the app in EDIT mode
      expect(getByText(appointment, "Save")).toBeInTheDocument();

      // 6. Edit the appointment, name for example. 
      fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { target: { value: "Kayden" } });

      // 7. Click on Save btn
      fireEvent.click(getByText(appointment, "Save"));
      // 8. Check the DOM status, mode must be SAVING
      expect(getByText(appointment, "SAVING IN THE PROCESS")).toBeInTheDocument();

      // 9. Wait for changes to take place and find the day of change
      await waitForElement(() => getByText(appointment, "Kayden"));
      const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
      // 10. Check if the amount of spots is the same as it was
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")
      .find(app => queryByText(app, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { target: { value: "Kayden" } });

    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => getByText(appointment, "Could not save your appointment"));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")
      .find(app => queryByText(app, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete your appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING APPOINTMENT")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Could not delete your appointment"));
    debug(appointment);

  });

});
