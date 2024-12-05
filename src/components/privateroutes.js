// src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Check if a token exists in localStorage
  const token = localStorage.getItem("token");

  // If token exists, user is authenticated
  const isAuthenticated = !!token;

  // Render the child routes if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
