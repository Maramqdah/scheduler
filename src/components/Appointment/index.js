import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
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

  }


  return (
    <Fragment>
      <Header time={props.time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"SAVING"}/>}
      {mode === CREATE && <Form interviewers={props.interviewers}
        onCancel={() => back()} onSave={save} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </Fragment>

  )

}

 // <article className="appointment">{props.time && `Appointment at ${props.time}`}
    //   {!props.time && `No Appointment`}</article>
