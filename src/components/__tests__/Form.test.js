import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

/* This is an example that shows how to click on the "Save" button. */
// fireEvent.click(getByText("Save"));


describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders", () => {
    const { getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
      />
    );
  });

  it("renders with a student name", () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
      />
    );
  });

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
        student=""
      />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
      />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const mockOnSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={mockOnSave}
      />
    );
    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const mockOnSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={mockOnSave}
        student="Lydia Miller-Jones"
      />
    );
    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */
    const mockOnSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText, getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={mockOnSave}
        student="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );
    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});