import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ConfirmPassForm = ({ email }) => {
  const url = process.env.REACT_APP_URL;

  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function handleNewPassChange(e) {
    setNewPass(e.target.value);
  }

  function handleConfirmPassChange(e) {
    setConfirmPass(e.target.value);
  }

  function updatePassword() {
    console.log("update password called");
    console.log({
      email: email,
      password: confirmPass,
    });
    if (newPass !== confirmPass) {
      toast.error("password and confirm password did not match");
    } else {
      axios
        .post(`${url}/api/v1/passwordReset`, {
          email,
          password: confirmPass,
        })
        .then(() => navigate("/"))
        .then(() => toast.success("Password Set Successfully!"))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="border  rounded-lg w-1/3 flex flex-col gap-y-10 shadow-[5px_5px_0px_0px_rgba(109,40,217)] px-5 pt-5 pb-5">
        <div>
          <p className="text-3xl font-bold text-start">Change Password</p>
        </div>
        <div className="flex flex-col  justify-center gap-5">
          <div>
            <p className="text-start">New Password</p>

            <input
              type="text"
              name="newPassword"
              value={newPass}
              onChange={handleNewPassChange}
              className="border border-black w-full h-10 rounded-md pl-2"
            />
          </div>
          <div>
            <p className="text-start">Confirm Password</p>

            <input
              type="text"
              name="confirmPassword"
              value={confirmPass}
              onChange={handleConfirmPassChange}
              className="border border-black w-full h-10 rounded-md pl-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="cursor-pointer">
            I accept the Terms & Conditions
          </label>
        </div>
        <Button
          value="Change Password"
          color="sign-color"
          className="h-10 rounded-md"
          onClick={() => {
            updatePassword();
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmPassForm;
