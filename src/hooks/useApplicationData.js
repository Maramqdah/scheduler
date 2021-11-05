import React,{useState} from "react";
import axios from "axios";


const useApplicationData=()=>{
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

function updateSpots(newAppointments) {

  return state.days.map((eachDay)=>{
    let freeSpots=0;
    for (const key of eachDay.appointments){
      if(!newAppointments[key].interview) freeSpots++;
    }
    return {...eachDay, spots:freeSpots}
  })
  
}

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
      axios.put(`/api/appointments/${id}`,{interview})
      .then((res)=>{
        setState({
          ...state,
          appointments,
          days:updateSpots(appointments)
        });
      }))
  }


  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
      setState({
        ...state,
        appointments,
        days:updateSpots(appointments)
      })
      
    })
  }

  const setDay = day => setState({ ...state, day });

  return{setDay,cancelInterview,bookInterview,state,setState}

}

export default useApplicationData;

