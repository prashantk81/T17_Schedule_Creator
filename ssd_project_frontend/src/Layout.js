import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import { Query } from "./Components/Query";
import Userinput from "./Components/Userinput";
function Layout() {
  return (
    <div className="app">
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/user" element={<Userinput />} />
            <Route path="/query" element={<Query />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default Layout;
