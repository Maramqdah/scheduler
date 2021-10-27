import React from "react";
import "components/Appointment/styles.scss";

export default function Apponitment(props) {

  return (
    <article className="appointment">{props.time && `Appointment at ${props.time}`}
      {!props.time && `No Appointment`}</article>
  )

}