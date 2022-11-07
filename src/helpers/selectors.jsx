
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(thisDay => thisDay.name === day);
  if (!foundDay) {
    return [];
  }

  const mappedData = foundDay.appointments.map((appointmentId) => {
    return state.appointments[appointmentId];
  });
  return mappedData;
}


export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);
  if (!state.days.length || !filteredDays.length) {
    return [];
  }
  const exctractedInterviewers = filteredDays[0];
  let formattedInterviewers = [];
  for (let interviewer of exctractedInterviewers.interviewers) {
    console.log("STATE", state.interviewers[interviewer]);
    formattedInterviewers.push(state.interviewers[interviewer]);
  }
  console.log("FORMATED", formattedInterviewers);
  return formattedInterviewers;
}