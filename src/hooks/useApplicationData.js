import axios from "axios";
import { useState } from "react";
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
        setState({ ...state, appointments });
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
        setState({ ...state, appointments });
      });
  }


  return { state, setState, setDay, bookInterview, cancelInterview };
}