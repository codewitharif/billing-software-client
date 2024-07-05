// PrivateRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("jwtoken"); // Check if JWT token exists in localStorage

  return isAuthenticated ? ( // If token exists, render the provided element
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace /> // If token does not exist, redirect to the login page
  );
};

export default PrivateRoute;
