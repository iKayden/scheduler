import axios from "axios";
import { useEffect, useState } from "react";
export default function useApplicationData() {


  // Helper functions for main useState
  const setDay = day => setState({ ...state, day });
  // Main useState object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function countTheSpotsLeft(state, appointments) {

    return state.days.map((day) => { //only updates selected (the one in our "state.day") day
      if (day.name === state.day) { //only checking values for the current day and then returning it back
        return {
          ...day, //all the info for current day
          spots: day.appointments //adding spots based on appointments, looping trough them
            .map((id) => (appointments[id])) //access to all appointments
            .filter(({ interview }) => { //if the current appointment falsy (doesn't exist)
              return !interview; //give back only falsy ones
            }).length //give back the length of null interviews and use it as free spots
        };
      }
      return day; //just returning every day without mutating it
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: countTheSpotsLeft(state, appointments)
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: countTheSpotsLeft(state, appointments)
        });
      });
  }

  //Variables with axios get URLs for our Promise array
  const promise_days = axios.get("/api/days");
  const promise_appointments = axios.get("/api/appointments");
  const promise_interviewers = axios.get("/api/interviewers");

  // Fetching all the data from our API with Promise.all function
  useEffect(() => {
    Promise.all([
      promise_days,
      promise_appointments,
      promise_interviewers
    ]).then((res) => {
      setState(prev =>
      ({
        ...prev, days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }));
    });
  }, []); //keeping this array empty so there won't be an infinite get request loop

  return { state, setState, setDay, bookInterview, cancelInterview };
}
