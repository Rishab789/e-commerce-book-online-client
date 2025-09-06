import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "./../contexts/LogInContext";
import { jwtDecode } from "jwt-decode"; // Install jwt-decode library to parse JWT tokens
import toast, { Toaster } from "react-hot-toast";
import user from "./../assets/dashboardAssets/user.png";
import axios from "axios";

const TopBar = ({ onLogoutClick }) => {
  const { auth, logout, userId } = useContext(LogInContext); // Use context
  const navigate = useNavigate();
  const [roles, setRole] = useState(null);
  const [users, setUsers] = useState(null);

  const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;

  useEffect(() => {
    if (!userId) return; // wait until userId is set
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/getUser/${userId}`,
          { withCredentials: true } // include cookies if using auth
        );
        setUsers(res.data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (auth?.token) {
      try {
        const decodedToken = jwtDecode(auth.token);
        const role = decodedToken.role;
        setRole(role);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
  }, [auth]);

  const handleDashboardClick = () => {
    if (auth.token) {
      try {
        const decodedToken = jwtDecode(auth.token); // Decode JWT token

        if (decodedToken.role === "Admin") {
          navigate("/dashboard");
        } else {
          toast.error("Access denied. Admins only.");
        }
      } catch (error) {
        toast.error("Invalid token.");
      }
    } else {
      toast.error("You are not logged in.");
    }
  };

  return (
    <section className="bg-primary-color flex flex-wrap justify-center md:justify-end lg:justify-end container">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-wrap gap-2 pt-2 pb-2 items-center">
        <span
          onClick={handleDashboardClick}
          className={`hover:text-secondary-color text-sm cursor-pointer ${
            roles == "Admin" ? "visible" : "hidden"
          }`}
        >
          Dashboard
        </span>
        {roles == "Admin" && <div className="separator"></div>}
        {/* <a href="/myaccount" className="hover:text-secondary-color text-sm">
          My Account
        </a> */}
        {/* <div className="separator"></div> */}
        <a
          href="/checkout"
          className={`hover:text-secondary-color text-sm ${
            auth?.token ? "block" : "hidden"
          }`}
        >
          Checkout
        </a>
        <div className={`separator  ${auth?.token ? "block" : "hidden"}`}></div>
        {/* <Link to="/signin" className="hover:text-secondary-color text-sm"> */}
        {auth.isLoggedIn ? (
          <span
            onClick={() => {
              console.log("button clicked");
              onLogoutClick();

              // setRole(null);
            }} // Call logout on click
            className="hover:text-secondary-color text-sm cursor-pointer"
          >
            Log out
          </span>
        ) : (
          <Link to="/signin" className="hover:text-secondary-color text-sm">
            Log in
          </Link>
        )}
        <div className={`separator ${auth?.token ? "block" : "hidden"}`}></div>

        <a
          href="/myaccount"
          className={`hover:text-secondary-color text-sm ${
            auth?.token ? "block" : "hidden"
          }`}
        >
          <img src={user} width={20} />
        </a>
        <p>{users ? users.email : ""}</p>
      </div>
    </section>
  );
};

export default TopBar;
