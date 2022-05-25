import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  if (!user.loggedIn) return <Navigate to="/login" replace />;
  else return children;
};
