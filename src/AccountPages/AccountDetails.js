import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { LogInContext } from "../contexts/LogInContext";

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;
  const { userId } = useContext(LogInContext);

  useEffect(() => {
    // Replace with the actual userId (from JWT, localStorage, or context)
    if (!userId) return; // wait until userId is set
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/getUser/${userId}`,
          { withCredentials: true } // include cookies if using auth
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <p className="text-2xl border-b-2 mb-5">Account Details</p>

      {user ? (
        <div className="mb-5">
          <p>Name: {user.name}</p>
          <p className="text-sm lg:text-xl">Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      {/* If you want to enable password change form later */}
      {/* <div>
        <form>
          <div className="mb-2">
            <p>New Password</p>
            <input
              type="password"
              placeholder="New Password"
              className="h-10 border border-black w-full md:w-1/2 lg:w-1/2 px-2"
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-10 border w-full md:w-1/2 lg:w-1/2 border-black px-2"
            />
          </div>
          <Button value="SAVE CHANGES" color="sign-color" className="mt-5" />
        </form>
      </div> */}
    </div>
  );
};

export default AccountDetails;
