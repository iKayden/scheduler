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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  const deleteInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
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
      {/* bug after onClose */}
      {/* TypeError: Cannot read properties of null (reading 'student') */}

    </article>
  );
}