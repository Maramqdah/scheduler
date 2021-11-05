import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";

  const [displayMode, setDisplayMode] = useState(props.interview);



  const { mode, transition, back } = useVisualMode(
    displayMode ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch((err) => {
        if (err) {
          transition(ERROR_SAVE,true);
        }
      });

  }

  function deleteAppointemet() {
    transition(CONFIRM);
  };
  const confirmDeleting = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        if (err) {
          transition(ERROR_DELETE, true);
        }
      });
  };
  //   -------- Edit ----------
  const editAppointment = () => {
    transition(EDIT);
  };


  return (
    //used article instead of fragment to apply styles
    <article className="appointment" >
      <Header time={props.time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure?"} onConfirm={confirmDeleting} onCancel={() => transition(() => back())} />}
      {mode === CREATE && <Form interviewers={props.interviewers}
        onCancel={() => back()} onSave={save} />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )} 
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointemet}
          onEdit={editAppointment}

        />
      )}
    </article>

  )

}

 // <article className="appointment">{props.time && `Appointment at ${props.time}`}
    //   {!props.time && `No Appointment`}</article>
