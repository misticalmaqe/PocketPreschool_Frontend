// NavBar.js
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { UserContext } from '../Provider/UserProvider';
//--------------COMPONENTS ON--------------//
import activity from '../Images/icon_activities_active.png';
import chat from '../Images/icon_chat_active.png';
import home from '../Images/icon_home_active.png';
import profile from '../Images/icon_profile_active02.png';
//--------------COMPONENTS OFF--------------//
import activityOff from '../Images/icon_activities_not_active.png';
import chatOff from '../Images/icon_chat_not_active.png';
import homeOff from '../Images/icon_home_not_active.png';
import profileOff from '../Images/icon_profile_not_active02.png';

const NavBar = () => {
  const { isAdmin } = useContext(UserContext);
  return (
    <nav
      className={`NavBar ${
        isAdmin ? 'bg-adminBackground' : 'bg-parentBackground'
      } fixed bottom-0 w-full flex justify-evenly p-[10px]`}
    >
      <NavLink to="/home" className="nav-link">
        {({ isActive }) => (
          <img src={isActive ? home : homeOff} alt="Home" className="w-[7em]" />
        )}
      </NavLink>

      <NavLink to="/activity" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? activity : activityOff}
            alt="Activity"
            className="w-[7em]"
          />
        )}
      </NavLink>

      <NavLink to="/chat" className="nav-link">
        {({ isActive }) => (
          <img src={isActive ? chat : chatOff} alt="Chat" className="w-[7em]" />
        )}
      </NavLink>

      <NavLink to="/profile" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? profile : profileOff}
            alt="Profile"
            className="w-[7em]"
          />
        )}
      </NavLink>

      {/* Render the child components based on the route */}
      <Outlet />
    </nav>
  );
};

export default NavBar;
