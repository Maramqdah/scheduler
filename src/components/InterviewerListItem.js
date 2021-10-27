import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const intervieweClass = classNames("interviewers__item",{"interviewers__item--selected":props.selected})

  
  return (
    <li className={intervieweClass} onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
       {props.name}
    </li>
  )

}

