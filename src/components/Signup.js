import React, { useState } from "react";
import loading from "../assets/truckLoader.json";
import Lottie from "lottie-react";

const SignUp = () => {
  const url = process.env.REACT_APP_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (name.length === 0) {
      return "Name is required";
    }
    if (name.length > 15) {
      return "Name should not be more than 15 characters";
    }
    return "";
  };

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
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    // Check if terms are accepted
    if (!isTermsChecked) {
      alert("Please accept the Terms and Conditions");
      return;
    }

    // If there are any validation errors, don't submit
    if (nameError || emailError || passwordError) {
      return;
    }

    console.log(formData);
    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);

        // Handle successful signup
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setErrors({
          name: "",
          email: "",
          password: "",
        });
        setTouched({
          name: false,
          email: false,
          password: false,
        });
        setIsTermsChecked(false);
        alert(data.message || "Registration successful!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Real-time validation only if field has been touched
    let error = "";
    if (name === "name") {
      error = validateName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  return (
    <section className="grid text-center h-screen items-center">
      {isLoading ? (
        <div>
          <div className="flex justify-center items-center">
            <Lottie animationData={loading} loop={true} className="w-48 h-48" />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-4xl pt-5">Sign Up</p>
          <p className="pb-5 pt-2">
            Nice to meet you! Enter your details to register.
          </p>
          <div className="text-start w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/3 m-auto px-5 py-10 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
            <label>
              Your Name
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={changeHandler}
                  className={`border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-black"
                  } w-full h-10 rounded-md px-2 mb-1`}
                />
                {touched.name && (
                  <p
                    className={`text-xs mb-3 ${
                      errors.name ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    {errors.name || "Maximum 15 characters including spaces"}
                  </p>
                )}
                {!touched.name && <div className="mb-3"></div>}
              </div>
            </label>

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
                  type="text"
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

            <div className="flex items-center gap-5 mb-3">
              <input
                type="checkbox"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />
              <p>
                I agree to the{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
              </p>
            </div>

            <button
              type="button"
              onClick={submitHandler}
              className="uppercase px-2 py-1 text-white bg-black h-10 w-full rounded-md mb-5 hover:bg-gray-800 transition-colors"
            >
              SIGN UP
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUp;
