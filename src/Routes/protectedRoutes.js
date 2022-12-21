import { Route } from "react-router-dom";
import Profile from "../Pages/Profile/Profile";
import Account from "../Pages/Profile/Account";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import Test from "../Pages/Test/Test";
import AdminMiddleware from "../Middlewares/AdminMiddleware";

export const protectedRoutes = (
  <>
    <Route path="ca-nhan" element={<AuthMiddleware />}>
      <Route path="" element={<Profile />} />
      <Route path="tai-khoan" element={<Account />} />
    </Route>
  </>
);
