import React from "react";
import "components/Application.scss";
import "components/DayList";
import DayList from "components/DayList";
import { useState } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  function bookInterview(id, interview) {
    console.log("bookinterview",id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return(
      axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
      .then((res)=>{
        setState({
          ...state,
          appointments
        });
      }))
  }


  const dailyAppointment = getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day });
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
        <Appointment key="last" time="5pm"  bookInterview={bookInterview}/>
      </section>
    </main>
  );
}