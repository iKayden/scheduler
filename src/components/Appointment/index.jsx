import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Error from "./Error";
import Status from "./Status";
import Confirm from "./Confirm";

// Variables with different "mode" setting for the appointment window
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // using our custom hook to control state of the Appointment with "mode"
  // transition function is responsible for switching between states(modes) of the appointment
  // back function is used when we need to make a step back to the previous mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // functions for adding extra appointment or deleting existing one
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      // makes a PUT request and changes the number of spots left
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  const deleteInterview = () => {
    transition(DELETING, true);
    props
      // makes a DELETE request and increases the number of spots left
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING &&
        <Status message={"SAVING IN THE PROCESS"} />}

      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete your appointment?"}
          onCancel={() => back()}
          onConfirm={deleteInterview}
        />}
      {mode === DELETING &&
        <Status message={"DELETING APPOINTMENT"} />}

      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      }

      {mode === ERROR_SAVE &&
        <Error message={"Could not save your appointment"} onClose={() => back()} />}

      {mode === ERROR_DELETE &&
        <Error message={"Could not delete your appointment"} onClose={() => back()} />}

    </article>
  );
}