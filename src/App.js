import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import UserProvider from './Provider/UserProvider';

//--------------COMPONENTS--------------//
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import Activity from './Pages/Activity';
import Chat from './Pages/Chat';
import Message from './Pages/Message';
import ProfilePage from './Pages/ProfilePage';
import SignUpPage from './Pages/SignUpPage';
import ErrorPage from './Pages/ErrorPage';
import LogInPage from './Pages/LogInPage';
import ForgotPassword from './Pages/ForgotPassword';
import StudentList from "./Components/StudentList";
import Attendance from "./Components/Attendance";
import LeaveApplication from "./Components/StaffLeaveApplication";
import CreateParentAccount from "./Components/CreateParentAccount";
import Settings from "./Components/Setting";
//import updateFeature from "./Pages/updateFeature";

// Create a new component for the layout without NavBar
const ChatLayout = ({ children }) => {
  return <div>{children}</div>;
};

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
       <Route path="/updatefeature" element={<updateFeature />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/activity" element={<Activity />} />
        {/* Use ChatLayout for /chat/Message */}
        <Route
          path="/chat/Message"
          element={
            <ChatLayout>
              <Message />
            </ChatLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <div>
              <NavBar />
              <Chat />
            </div>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
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
    </UserProvider>
  );
};

export default App;
