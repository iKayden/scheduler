import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days } = props;
  const parsedDays = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      onClick={props.setDay}
      selected={day.name === props.day}
    />
  ));

  return <ul>{parsedDays}</ul>;
}
