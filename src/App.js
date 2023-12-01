import React from "react";
import { Route, Routes } from "react-router-dom";
//import UserProvider from "./Provider/UserProvider";

// Import your componets for admin account...
import LogInPage from "./Pages/LogInPage";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Chat from "./Pages/Chat";
import Activity from "./Pages/Activity";
import ProfilePage from "./Pages/ProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ErrorPage from "./Pages/ErrorPage";

//Import you componets from parent account...
// import { LogInPage } from "./Pages/LogInPage";
// import { ForgotPassword } from "./Pages/ForgotPassword";
// import { HomePage } from "./Pages/HomePage";
// import { Chat } from "./Pages/Chat";
// import { Activity } from "./Pages/Activity";
// import { ProfilePage } from "./Pages/ProfilePage";
// import { ErrorPage } from "./Pages/ErrorPage";

//--------------STYLING--------------//
import "./App.css";

// App componets
export default function App() {
  return (
    // <UserProvider>
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    // </UserProvider>
  );
}
