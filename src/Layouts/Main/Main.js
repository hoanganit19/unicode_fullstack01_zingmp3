import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RouteCore from "../../Services/Routes/RouteCore";
import Sidebar from "../Sidebar/Sidebar";

export default function Main() {
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
        </div>
      </div>
    </div>
  );
}
