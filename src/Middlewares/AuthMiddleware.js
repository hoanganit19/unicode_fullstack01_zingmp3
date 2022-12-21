import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../Pages/Auth/authSlice";
import PreLoader from "../Components/PreLoader/PreLoader";

export default function AuthMiddleware() {
  const auth = useSelector(authSelector);

  const { isLoading, isAuthenticated } = auth.userLogin;

  if (isLoading) return <PreLoader />;

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}
