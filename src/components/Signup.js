import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const url = process.env.REACT_APP_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [res, setRes] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    console.log(formData);

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
        // const result = await response.json();

        // Handle successful signup
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
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

  // const notify = () => {
  //   console.log(res);
  //   res
  //     ? toast.success("user registered successfully")
  //     : toast.error("something went wrong");
  // };

  return (
    <section className="grid text-center h-screen items-center">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div>
        <p className="text-4xl pt-5">Sign Up</p>
        <p className="pb-5 pt-2">
          Nice to meet you! Enter your details to register.
        </p>
        <form
          onSubmit={(e) => submitHandler(e)}
          action="#"
          className="text-start w-[90%]  sm:w-1/2 md:w-1/3  lg:w-1/3 m-auto px-5 py-10 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
        >
          <label>
            Your Name
            <div>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
                className="border border-black w-full h-10 rounded-md px-2 mb-3"
              />
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
                className="border border-black w-full h-10 rounded-md px-2 mb-3"
              />
            </div>
          </label>
          <label>
            Password
            <div className="relative ">
              <input
                type="text"
                name="password"
                id="password"
                value={formData.password}
                onChange={changeHandler}
                className="border border-black w-full h-10 rounded-md px-2 mb-5"
              />
            </div>
          </label>
          <div className="flex items-center gap-5 mb-3">
            <input type="checkbox" />
            <p>
              I agree the <a href="#">Terms and Conditions</a>
            </p>
          </div>

          <button
            className={`uppercase px-2 py-1 text-white   bg-black h-10 w-full rounded-md mb-5`}
          >
            SIGN UP
          </button>

          <p className="text-center">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
