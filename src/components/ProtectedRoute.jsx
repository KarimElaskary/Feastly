import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // if no token, redirect to signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // otherwise, show the protected content
  return children;
};

export default ProtectedRoute;
