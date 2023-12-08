import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProvider from './Provider/UserProvider';

//--------------COMPONENTS--------------//
import HomePage from './Pages/HomePage';
import Activity from './Pages/Activity';
import Chat from './Pages/Chat';
import Message from './Pages/Message';
import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/ErrorPage';
import LogInPage from './Pages/LogInPage';
import ForgotPassword from './Pages/ForgotPassword';
import StudentList from './Pages/StudentList';
import Attendance from './Pages/Attendance';
import LeaveApplication from './Pages/StaffLeaveApplication';
import CreateParentAccount from './Pages/CreateParentAccount';
import Settings from './Pages/Setting';
import NewsPostPage from './Pages/NewsPostPage';
//import updateFeature from "./Pages/updateFeature";
//--------------STYLING--------------//
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        {/* Login Page Routes */}
        <Route path="/" element={<LogInPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/updatefeature" element={<updateFeature />} />

        {/* News Letter Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/post" element={<NewsPostPage />} />

        {/* Class Activity Routes */}
        <Route path="/activity" element={<Activity />} />

        {/* Chat Routes */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatroomId/Message" element={<Message />} />

        {/* Profile Routes */}
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
      </Routes>
    </UserProvider>
  );
};

export default App;
