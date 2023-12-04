import React from "react";
import { Route, Routes } from "react-router-dom";

import LogInPage from "./Pages/LogInPage";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Chat from "./Pages/Chat";
import Activity from "./Pages/Activity";
import ProfilePage from "./Pages/ProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ErrorPage from "./Pages/ErrorPage";

import "./App.css";

export default function App() {
  return (
    //<UserProvider>
    //<Router>
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    // </Router>
    //</UserProvider>
  );
}
