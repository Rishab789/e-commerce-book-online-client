import React, { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const url = process.env.REACT_APP_URL;

  const [email, setEmail] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("this is email coming", email);

    try {
      const response = await fetch(`${url}/api/v1/posts/getMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // const result = await response.json();
        alert("POST up successful");
        // Handle successful signup
        setEmail(email);
      } else {
        alert("POST up failed");
        // Handle signup failure
      }
    } catch (e) {
      console.error("Error:", e);
      alert("An error occurred");
    }
  };

  return (
    <div className=" mt-10 relative">
      <section className="p-5">
        {/* dot  */}
        <div className="dot m-auto"></div>
        {/* thread  */}
        <div className="flex justify-center">
          <div className="left-thread"></div>
          <div className="right-thread"></div>
        </div>

        {/* box  */}
        <div className="bg-secondary-color mt-6 pt-5 px-5">
          <p className="font-bold text-white text-xl text-center">
            SIGN UP FOR SEND
          </p>
          <p className="font-bold text-white text-xl text-center mb-3">
            NEWSLETTER
          </p>
          <p className="rufina1 text-white text-lg text-center mb-5">
            You can be always up to date with our company new!
          </p>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              placeholder="Enter your email address"
              className="mb-5 h-8 border  w-[100%] md:w-[31.25rem]"
              name="email"
              onChange={changeHandler}
              value={email}
            />
            <button className="btn mb-5">SEND EMAIL</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
