import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {


  const parsedDays = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  ));

  return <ul>{parsedDays}</ul>;
}
