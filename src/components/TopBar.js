import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "./../contexts/LogInContext";
import { jwtDecode } from "jwt-decode"; // Install jwt-decode library to parse JWT tokens
import toast, { Toaster } from "react-hot-toast";
import user from "./../assets/dashboardAssets/user.png";

const TopBar = ({ onLogoutClick }) => {
  const { auth, logout } = useContext(LogInContext); // Use context
  const navigate = useNavigate();
  const [roles, setRole] = useState(null);

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
        <a href="/checkout" className={`hover:text-secondary-color text-sm `}>
          Checkout
        </a>
        <div className="separator "></div>
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
        <div className={`separator`}></div>

        <a href="/myaccount" className={`hover:text-secondary-color text-sm `}>
          <img src={user} width={20} />
        </a>
      </div>
    </section>
  );
};

export default TopBar;
