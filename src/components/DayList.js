import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, setDay } = props;
  const parsedDays = days.map((day) => (
    <DayListItem
      {...day}
      key={day.id}
      onClick={setDay}
      selected={day.name === props.day}
    />
  ));

  return <ul>{parsedDays}</ul>;
}
