import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../../Routes/publicRoutes";
import { protectedRoutes } from "../../Routes/protectedRoutes";
import Error404 from "../../Errors/Error404";

export default function RouteCore() {
  return (
    <Routes>
      {publicRoutes}
      {protectedRoutes}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
