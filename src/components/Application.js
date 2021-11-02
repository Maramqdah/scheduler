import React from "react";
import "components/Application.scss";
import "components/DayList";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { useEffect,useState } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  useEffect(() => {
    axios.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((resArr) => {
        setState((prevState) => ({
          ...prevState,
          days: resArr[0].data,
          appointments: resArr[1].data,
          interviewers: resArr[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  
  


  const dailyAppointment = getAppointmentsForDay(state, state.day)
 
  const schedule = dailyAppointment.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers={getInterviewersForDay(state,state.day)}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} onChange={setDay} day={state.day} />{" "}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}