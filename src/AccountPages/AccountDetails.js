import React from "react";
import Button from "../components/Button";

const AccountDetails = () => {
  return (
    <div>
      <p className="text-2xl border-b-2  mb-5">Account Details</p>
      <div className="mb-5">
        <p>Name: John Doe</p>
        <p className="text-sm lg:text-xl">email: johndoe26@gmail.com</p>
      </div>
      <div>
        <form>
          <div className="mb-2">
            <p>New Password</p>
            <input
              type="text"
              placeholder="New Password"
              className="h-10 border border-black w-full md:w-1/2 lg:w-1/2 px-2 "
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              type="text"
              placeholder="Confirm Password"
              className="h-10 border w-full md:w-1/2 lg:w-1/2 border-black px-2"
            />
          </div>
          <Button value="SAVE CHANGES" color="sign-color" className="mt-5" />
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
