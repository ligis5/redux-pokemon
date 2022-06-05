import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // requestLoaded will be true if user logged in and if user failed to log in,
  if (!user.loggedIn && user.requestLoaded)
    return <Navigate to="/login" replace />;
  else return children;
};
