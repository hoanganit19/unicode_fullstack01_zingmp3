import { Route } from "react-router-dom";
import Profile from "../Pages/Profile/Profile";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import Test from "../Pages/Test/Test";
import AdminMiddleware from "../Middlewares/AdminMiddleware";

export const protectedRoutes = (
  <>
    <Route path="ca-nhan" element={<AuthMiddleware />}>
      <Route path="" element={<Profile />} />
      <Route path="ca-sy" element={<AdminMiddleware />}>
        <Route path="" element={<Test />} />
      </Route>
    </Route>
  </>
);
