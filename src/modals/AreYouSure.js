import React, { useContext } from "react";
import Button from "../components/Button";
import { LogInContext } from "../contexts/LogInContext";
import { useNavigate } from "react-router-dom";

const AreYouSure = (props) => {
  const { logout } = useContext(LogInContext); // Use context
  const navigate = useNavigate();
  const className = props.className;

  const logOuthandler = () => {
    logout();
    navigate("/");
  };

  return (
    // <div className={`flex justify-center items-center bg-red-200 `}>
    <div
      className={`border border-black rounded-lg w-1/3 h-48  text-center  flex justify-center items-center ${className} bg-[#ecf0f1]`}
    >
      <div className="w-full">
        <p
          className="cursor-pointer absolute top-2 right-3"
          onClick={() => {
            props.setIsLogOut(false);
          }}
        >
          ❌
        </p>
        <p className="text-lg font-bold mb-5">Are you Sure to Log out?</p>
        <Button
          value="Ok"
          color="sign-color"
          className="w-1/4 "
          onClick={logOuthandler}
        />
      </div>
    </div>
    // </div>
  );
};

export default AreYouSure;
