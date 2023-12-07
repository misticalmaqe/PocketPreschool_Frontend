import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProvider from './Provider/UserProvider';

//--------------COMPONENTS--------------//
import HomePage from './Pages/HomePage';
import Activity from './Pages/Activity';
import Chat from './Pages/Chat';
import Message from './Pages/Message';
import ProfilePage from './Pages/ProfilePage';
import SignUpPage from './Pages/SignUpPage';
import ErrorPage from './Pages/ErrorPage';
import LogInPage from './Pages/LogInPage';
import ForgotPassword from './Pages/ForgotPassword';
import StudentList from './Components/StudentList';
import Attendance from './Components/Attendance';
import LeaveApplication from './Components/StaffLeaveApplication';
import CreateParentAccount from './Components/CreateParentAccount';
import Settings from './Components/Setting';
//import updateFeature from "./Pages/updateFeature";

//--------------STYLING--------------//
import './App.css';

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
        <Route path="/chat" element={<Chat />}>
          <Route path="Message" element={<Message />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="student-list" element={<StudentList />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave-application" element={<LeaveApplication />} />
          <Route
            path="create-parent-account"
            element={<CreateParentAccount />}
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
