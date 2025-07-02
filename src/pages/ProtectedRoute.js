import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";

function ProtectedRoute({ children }) {
  const { auth, logout, login } = useContext(LogInContext); // Use context

  // Define the condition to block direct access
  console.log("this is auth", auth);
  const allowAccess = false;

  if (allowAccess) {
    // Redirect to the home page or any other page if not allowed
    return <Navigate to="/" replace />;
  }

  // Render the route's component if the condition is met
  return children;
}

export default ProtectedRoute;
