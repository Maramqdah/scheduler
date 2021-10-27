import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  console.log("", props.interviewers)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">{props.interviewers.map((interviewer) => {
        return <InterviewerListItem
          key={interviewer.id}
          selected={props.interviewer === interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar} 
          setInterviewer={() => props.setInterviewer(interviewer.id)} />
      })
      }</ul>
    </section>
  )
}

