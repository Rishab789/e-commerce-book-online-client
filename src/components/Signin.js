import { useContext, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "./../contexts/LogInContext";
import OTPForm from "../modals/OTPForm";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loading from "../assets/truckLoader.json";
import Lottie from "lottie-react";

export function Signin() {
  const url = process.env.REACT_APP_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [type, setType] = useState("password");
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [otp, setOtp] = useState();

  const { login, handleGoogleLogin } = useContext(LogInContext); // Use context

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    if (email.length === 0) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length === 0) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password should be at least 8 characters long";
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return "";
  };

  async function submitHandler(e) {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setTouched({
      email: true,
      password: true,
    });

    // If there are any validation errors, don't submit
    if (emailError || passwordError) {
      return;
    }
    setIsLoading(true);

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
        setIsLoading(false);
        // const result = await response.json();

        // Handle successful signup
        setFormData({
          email: "",
          password: "",
        });
        setErrors({
          email: "",
          password: "",
        });
        setTouched({
          email: false,
          password: false,
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
    const { name, value } = e.target;

    setFormData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Real-time validation only if field has been touched
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
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

  const onGoogleSuccess = async (credentialResponse) => {
    // Optional: decode and log for debugging
    const credentialResponseDecode = jwtDecode(credentialResponse.credential);
    console.log("Google user info:", credentialResponseDecode);

    // Use the context handler
    const result = await handleGoogleLogin(credentialResponse);

    if (result.success) {
      toast.success(result.message || "Google login successful!");
    } else {
      toast.error(result.message || "Google login failed");
    }
  };

  return (
    <section className="grid text-center h-screen items-center">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Lottie animationData={loading} loop={true} className="w-48 h-48" />
        </div>
      ) : (
        <>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          {!showOTP && (
            <div>
              <p className="text-4xl pt-5">Sign In</p>
              <p className="pb-5 pt-2">
                Enter your email and password to sign in{" "}
              </p>
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
                      className={`border ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-black"
                      } w-full h-10 rounded-md px-2 mb-1`}
                    />
                    {touched.email && (
                      <p
                        className={`text-xs mb-3 ${
                          errors.email ? "text-red-500" : "text-gray-600"
                        }`}
                      >
                        {errors.email || "Enter a valid email"}
                      </p>
                    )}
                    {!touched.email && <div className="mb-3"></div>}
                  </div>
                </label>
                <label>
                  Password
                  <div className="relative">
                    <input
                      type={type}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={changeHandler}
                      className={`border ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-black"
                      } w-full h-10 rounded-md px-2 mb-1`}
                    />
                    <div
                      onClick={() => {
                        setShowPassword((prev) => {
                          const newShowPassword = !prev;
                          setType(newShowPassword ? "text" : "password");
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
                    {touched.password && (
                      <p
                        className={`text-xs mb-5 ${
                          errors.password ? "text-red-500" : "text-gray-600"
                        }`}
                      >
                        {errors.password ||
                          "8 characters with uppercase, lowercase, number, and special character"}
                      </p>
                    )}
                    {!touched.password && <div className="mb-5"></div>}
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

                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                {/* </div> */}
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
        </>
      )}
    </section>
  );
}

export default Signin;
