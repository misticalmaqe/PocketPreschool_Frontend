import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
        {/* Render Chat with NavBar for /chat */}
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
      </Routes>
    </UserProvider>
  );
};

export default App;
