import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RouteCore from "../../Services/Routes/RouteCore";
import Sidebar from "../Sidebar/Sidebar";
import { authActions } from "../../Pages/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Player from "../../Components/Player/Player";
import {
  playerSelector,
  fetchSongById,
} from "../../Components/Player/playerSlice";

const { getUser } = authActions;

export default function Main() {
  const dispatch = useDispatch();
  const { song } = useSelector(playerSelector);

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

  useEffect(() => {
    if (localStorage.getItem("currentSong")) {
      const songId = localStorage.getItem("currentSong");
      dispatch(fetchSongById(songId));
    }
  }, []);

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
          {Object.keys(song).length && <Player />}
        </div>
      </div>
    </div>
  );
}
