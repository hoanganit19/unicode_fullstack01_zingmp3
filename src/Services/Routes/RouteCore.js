import React from "react";
import { Routes } from "react-router-dom";
import { publicRoutes } from "../../Routes/publicRoutes";
import { protectedRoutes } from "../../Routes/protectedRoutes";

export default function RouteCore() {
  return (
    <Routes>
      {publicRoutes}
      {protectedRoutes}
    </Routes>
  );
}
