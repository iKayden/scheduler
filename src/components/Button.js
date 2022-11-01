import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  const { children, confirm, danger, disabled, onClick } = props;
  const buttonClass = classNames("button ", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
