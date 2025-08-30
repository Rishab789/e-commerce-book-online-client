import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Cookies from "js-cookie"; // Install js-cookie library for easy cookie handling
import { useNavigate } from "react-router-dom";
export const LogInContext = createContext();
import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

// import { jwt } from "jsonwebtoken";

export function LoginConextProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
  });
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // Load token from cookies on initial render
  // useEffect(() => {
  //   console.log("this is auth ", auth);
  //   const token = Cookies.get("authToken");
  //   if (token) {
  //     setAuth({
  //       isLoggedIn: true,
  //       token,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const token = Cookies.get("authToken");
    // const decodedToken = jwt_decode(token);

    if (token) {
      try {
        // Decode the token to extract userId and check expiration
        // const decodedToken = jwt.decode(token);
        const decodedToken = jwtDecode(token); // ✅ correct usage

        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          setAuth({
            isLoggedIn: true,
            token,
          });
          setUserId(decodedToken.id); // Set userId from the token
        } else {
          // Token is expired, remove it
          Cookies.remove("authToken");
          setAuth({
            isLoggedIn: false,
            token: null,
          });
          setUserId(null);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        Cookies.remove("authToken");
        setAuth({
          isLoggedIn: false,
          token: null,
        });
        setUserId(null);
      }
    }
  }, []);

  const login = (token, userId) => {
    console.log("Token retrieved from cookies:", token);

    Cookies.set("authToken", token);

    setAuth({
      isLoggedIn: true,
      token,
    });
    setUserId(userId);
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const url = process.env.REACT_APP_URL;

      // Send the Google credential to your backend
      const response = await fetch(`${url}/api/v1/googleLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        const userId = user._id;

        // Use the existing login function
        login(token, userId);
        navigate("/");
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Google login error:", error);
      return {
        success: false,
        message: "Something went wrong with Google login",
      };
    }
  };
  const logout = () => {
    Cookies.remove("authToken"); // Remove token from cookies
    setAuth({
      isLoggedIn: false,
      token: null,
    });
    navigate("/");
    window.location.reload();

    // localStorage.removeItem(`cart_${userId}`);
  };

  return (
    <LogInContext.Provider
      value={{ auth, login, handleGoogleLogin, logout, userId }}
    >
      {children}
    </LogInContext.Provider>
  );
}

// Custom hook to use the AuthContext
