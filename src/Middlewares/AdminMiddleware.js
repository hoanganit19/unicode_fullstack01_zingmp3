import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAdmin = true;

export default function AdminMiddleware() {
  return isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
}
