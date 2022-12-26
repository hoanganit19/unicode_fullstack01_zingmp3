import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RouteCore from "../../Services/Routes/RouteCore";
import Sidebar from "../Sidebar/Sidebar";
import { authActions } from "../../Pages/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Player from "../../Components/Player/Player";

const { getUser } = authActions;

export default function Main() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    dispatch(
      getUser({
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
      })
    );
  }, [isLoading]);

  return (
    <div id="app">
      <div className="background"></div>
      <div className="grid">
        <div className="zing">
          <Sidebar />
          <div className="zing-main">
            <Header />
            <div className="zing-body">
              <RouteCore />
            </div>
          </div>
          <Player />
        </div>
      </div>
    </div>
  );
}
