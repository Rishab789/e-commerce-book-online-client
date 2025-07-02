import { useContext, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "./../contexts/LogInContext";
import OTPForm from "../modals/OTPForm";
import axios from "axios";
export function Signin() {
  const url = process.env.REACT_APP_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [type, setType] = useState("password");
  const [disable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState();

  const { login } = useContext(LogInContext); // Use context

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // const result = await response.json();

        // Handle successful signup
        setFormData({
          email: "",
          password: "",
        });
        toast.success(data.message);
        console.log("this is data ", data);
        const { token, user } = data;
        const userId = user._id; // Extract userId from the user object

        // login(data.token);
        login(token, userId); // Update your login function to accept userId

        navigate("/");
      } else {
        toast.error(data.message);
        // Handle signup failure
      }
    } catch (e) {
      console.error("Error:", e);
      toast.error("something went wrong");
    }
  }

  function changeHandler(e) {
    setFormData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function navigateToOTP() {
    if (formData.email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setDisable(true);
      console.log("Here is the OTP ", OTP);
      setOtp(OTP);
      axios
        .post(`${url}/api/v1/send_recovery_email`, {
          OTP,
          recipient_email: formData.email,
        })
        .then(() => {
          toast.success("otp sent to your email");
        })
        .catch((err) => console.log(err));
      return;
    }
    return toast.error("Please Enter Your Email");
  }

  return (
    <section className="grid text-center h-screen items-center">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {!showOTP && (
        <div>
          <p className="text-4xl pt-5">Sign In</p>
          <p className="pb-5 pt-2">Enter your email and password to sign in </p>
          <form
            onSubmit={(e) => submitHandler(e)}
            action="#"
            className="text-start   w-[90%]  sm:w-1/2 md:w-1/3  lg:w-1/3 m-auto px-5 py-10 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <label>
              Your Email
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="border border-black w-full h-10 rounded-md px-2 mb-3"
                />
              </div>
            </label>
            <label>
              Password
              <div className="relative ">
                <input
                  type={type}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={changeHandler}
                  className="border border-black w-full h-10 rounded-md px-2 mb-5"
                />
                <div
                  onClick={() => {
                    setShowPassword((prev) => {
                      const newShowPassword = !prev; // Toggle the state
                      setType(newShowPassword ? "text" : "password"); // Update type based on the new state
                      return newShowPassword;
                    });
                  }}
                >
                  {!showPassword ? (
                    <EyeIcon className="h-5 w-5 absolute right-3 cursor-pointer top-3 text-black" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 absolute right-3 cursor-pointer top-3 text-black" />
                  )}
                </div>
              </div>
            </label>

            <button
              className={`uppercase px-2 py-1 text-white   bg-black h-10 w-full rounded-md mb-5`}
            >
              SIGN IN
            </button>
            <div className="text-end mb-3">
              <p
                className="cursor-pointer"
                onClick={() => {
                  if (formData.email == "") {
                    toast.error("Please Enter Your Email Id");
                  } else {
                    setShowOTP(true);
                  }
                  navigateToOTP();
                }}
              >
                Forgot password?
              </p>
            </div>
            <div className="cursor-pointer flex border mb-3 border-black items-center gap-2 justify-center h-10 rounded-md">
              <img
                src="https://www.material-tailwind.com/logos/logo-google.png"
                width={30}
              />
              <p>SIGN IN WITH GOOGLE</p>
            </div>
            <p className="text-center">
              Not registered? <a href="/signup">Create account</a>
            </p>
          </form>
        </div>
      )}
      {showOTP && (
        <OTPForm
          showOTP={showOTP}
          otp={otp}
          disable={disable}
          setDisable={setDisable}
          email={formData.email}
        />
      )}
    </section>
  );
}

export default Signin;
