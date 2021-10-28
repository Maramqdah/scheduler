import React from "react";
import { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


export default function Appointment(props) {
 
  return (
    <Fragment>
      <Header time={props.time}>
      </Header>
      {props.interview ? <Show  student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
    </Fragment>

  )

}

 // <article className="appointment">{props.time && `Appointment at ${props.time}`}
    //   {!props.time && `No Appointment`}</article>
