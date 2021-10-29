import React from "react";
import "components/Application.scss";
import "components/DayList";
import DayList from "components/DayList";
import { useState } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointment = getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    axios.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((resArr) => {
        // console.log("res", resArr);
        setState((prevState) => ({
          ...prevState,
          days: resArr[0].data,
          appointments: resArr[1].data,
          interviewers: resArr[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);


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
        {dailyAppointment.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
          
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}