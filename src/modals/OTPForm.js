import React, { useEffect, useState } from "react";
import Button from "./../components/Button";
import ConfirmPassForm from "./ConfirmPassForm";
import toast from "react-hot-toast";
import axios from "axios";

const OTPForm = ({ showOTP, otp, disable, setDisable, email }) => {
  const url = process.env.REACT_APP_URL;

  const [showConfirm, setShowConfirm] = useState(false);
  const [inputOTP, setInputOTP] = useState([0, 0, 0, 0]);
  const [timer, setTimer] = useState(60);

  function verifyOTP() {
    if (inputOTP.join("") == otp) {
      setShowConfirm(true);
    } else {
      toast.error("wrong OTP");
    }
  }

  function resendOTP() {
    if (disable) {
      return;
    } else {
      axios
        .post(`${url}/api/v1/send_recovery_email`, {
          otp,
          recipient_email: email,
        })
        .then(() => setDisable(true))
        .then(() => setTimer(60))
        .then(() => toast.success("otp sent to your email"))
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    let timeInterval = setInterval(() => {
      setTimer((lastTimer) => {
        lastTimer <= 1 && clearInterval(timeInterval);
        if (lastTimer <= 1) setDisable(false);
        if (lastTimer <= 0) return lastTimer;
        return lastTimer - 1;
      });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [disable]);

  return (
    <div>
      {!showConfirm && (
        <div className="flex justify-center items-center ">
          <div className="border  rounded-lg w-1/3 flex flex-col gap-y-10 shadow-[5px_5px_0px_0px_rgba(109,40,217)] px-5 pt-5 pb-5">
            <div>
              <p className="text-4xl font-bold">Email Verification</p>
              <p>
                We have sent a code to your email: {"beraprakash456@gmail.com"}
              </p>
            </div>
            <div className="flex  justify-center gap-5">
              <input
                name="otp1"
                onChange={(e) =>
                  setInputOTP([
                    e.target.value,
                    inputOTP[1],
                    inputOTP[2],
                    inputOTP[3],
                  ])
                }
                type="text"
                className="text-center border border-gray-500 w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                name="otp2"
                onChange={(e) =>
                  setInputOTP([
                    inputOTP[0],
                    e.target.value,
                    inputOTP[2],
                    inputOTP[3],
                  ])
                }
                className="text-center border border-gray-500  w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                name="otp3"
                onChange={(e) =>
                  setInputOTP([
                    inputOTP[0],
                    inputOTP[1],
                    e.target.value,
                    inputOTP[3],
                  ])
                }
                className="text-center border border-gray-500 w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                name="otp4"
                onChange={(e) =>
                  setInputOTP([
                    inputOTP[0],
                    inputOTP[1],
                    inputOTP[2],
                    e.target.value,
                  ])
                }
                className="text-center border border-gray-500 w-12 h-12 rounded-lg cursor-pointer"
              />
            </div>
            <Button
              value="Verify Account"
              color="sign-color"
              className="h-10 rounded-md"
              onClick={() => {
                verifyOTP();
              }}
            />
            <p>
              Didn't receive code?{" "}
              <span
                className={`${
                  disable ? "text-gray-500" : "text-blue-600 cursor-pointer"
                }`}
                onClick={resendOTP}
              >
                Resend OTP in {timer}s
              </span>
            </p>
          </div>
        </div>
      )}
      {showConfirm && showOTP && <ConfirmPassForm email={email} />}
    </div>
  );
};

export default OTPForm;
