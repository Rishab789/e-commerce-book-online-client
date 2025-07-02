import React from "react";

const Button = (props) => {
  const colorClasses = {
    "secondary-color": "bg-secondary-color",
    "primary-color": "bg-primary-color",
    "btn-color": "bg-btn-color",
    "del-color": "bg-del-color",
    "sign-color": "bg-black",
  };
  const bgColor = colorClasses[props.color] || "bg-gray-500"; // Default
  const className = props.className;

  return (
    <button
      className={`uppercase px-2 py-1 text-white   ${bgColor} ${className}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Button;
