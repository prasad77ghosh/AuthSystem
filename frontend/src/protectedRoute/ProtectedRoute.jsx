import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtrctedRoute = () => {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.LoginReducer
  );
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }
  return <>{loading === false && <Outlet />}</>;
};

export default ProtrctedRoute;
