
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
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);
  if (!state.days.length || !filteredDays.length) {
    return [];
  }
  const extractedInterviewers = filteredDays[0];
  let formattedInterviewers = [];
  for (let interviewer of extractedInterviewers.interviewers) {
    formattedInterviewers.push(state.interviewers[interviewer]);
  }
  return formattedInterviewers;
}