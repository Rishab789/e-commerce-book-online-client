import React from "react";
import { contact } from "../services/contact";

const Info = () => {
  return (
    <div className="   p-5  grid-cols-1 sm:grid-cols-2  md:grid md:grid-cols-2 md:gap-5 grid  gap-5  lg:flex lg:justify-around">
      {contact.map(({ title, subTitle, icon }) => (
        <div className="flex items-center gap-1">
          <img src={icon} width={30} />
          <div>
            <p>{title}</p>
            <p>{subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
