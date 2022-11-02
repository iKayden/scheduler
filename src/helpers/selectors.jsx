
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