import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerListItemClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": selected
  }
  );
  return (
    <li
      className={interviewerListItemClass}
      selected={selected}
      onClick={() => setInterviewer(id)}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? name : ""}
    </li>
  );
}

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };