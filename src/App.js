// App.js
import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Activity from "./Pages/Activity";
import Chat from "./Pages/Chat";
import Message from "./Pages/Message";
import ProfilePage from "./Pages/ProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ErrorPage from "./Pages/ErrorPage";
import LogInPage from "./Pages/LogInPage";
import ForgotPassword from "./Pages/ForgotPassword";
import StudentList from "./Components/StudentList";
import Attendance from "./Components/Attendance";
import LeaveApplication from "./Components/StaffLeaveApplication";
import CreateParentAccount from "./Components/CreateParentAccount";
import Settings from "./Components/Setting";
//import updateFeature from "./Pages/updateFeature";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const toggleAdmin = () => {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/updatefeature" element={<updateFeature />} />
        <Route
          path="/home"
          element={<HomePage isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />}
        />
        <Route
          path="/activity"
          element={<Activity isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />}
        />
        <Route
          path="/chat/Message"
          element={
            <div>
              <NavBar isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
              <Message isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
            </div>
          }
        />
        <Route
          path="/chat"
          element={
            <div>
              <NavBar isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
              <Chat isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />
          }
        />
        <Route path="/profile/student-list" element={<StudentList />} />
        <Route path="/profile/attendance" element={<Attendance />} />
        <Route
          path="/profile/leave-application"
          element={<LeaveApplication />}
        />
        <Route
          path="/profile/create-parent-account"
          element={<CreateParentAccount />}
        />
        <Route path="/profile/settings" element={<Settings />} />

        {/* Use the Outlet to render child routes */}
        <Route index element={<Outlet />} />
      </Routes>
    </div>
  );
};

export default App;
