// NavBar.js
import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../Provider/UserProvider";

//--------------COMPONENTS ON--------------//
import activity from "../Images/icon_activities_active.png";
import chat from "../Images/icon_chat_active.png";
import home from "../Images/icon_home_active.png";
import profile from "../Images/icon_profile_active.png";
//--------------COMPONENTS OFF--------------//
import activityOff from "../Images/icon_activities_not_active.png";
import chatOff from "../Images/icon_chat_not_active.png";
import homeOff from "../Images/icon_home_not_active.png";
import profileOff from "../Images/icon_profile_not_active.png";

const NavBar = ({ onToggleAdmin }) => {
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  const setAdminStatus = (status) => {
    // Log admin state before updating
    console.log("Admin state before update:", isAdmin);

    // Update isAdmin based on the provided status
    setIsAdmin(status);

    // Log admin state after updating
    console.log("Admin state after update:", status);
  };

  return (
    <nav
      className={`NavBar ${
        isAdmin ? "bg-adminBackground" : "bg-parentBackground"
      }`}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        padding: "10px",
      }}
    >
      <NavLink to="/home" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? home : homeOff}
            alt="Home"
            style={{ maxWidth: "100px" }} // Set max width to 20 pixels
          />
        )}
      </NavLink>

      <NavLink to="/activity" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? activity : activityOff}
            alt="Activity"
            style={{ maxWidth: "100px" }} // Set max width to 20 pixels
          />
        )}
      </NavLink>

      <NavLink to="/chat" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? chat : chatOff}
            alt="Chat"
            style={{ maxWidth: "100px" }} // Set max width to 20 pixels
          />
        )}
      </NavLink>

      <NavLink to="/profile" className="nav-link">
        {({ isActive }) => (
          <img
            src={isActive ? profile : profileOff}
            alt="Profile"
            style={{ maxWidth: "100px" }} // Set max width to 20 pixels
          />
        )}
      </NavLink>

      <button
        onClick={() => setAdminStatus(!isAdmin)}
        className={`${
          isAdmin ? "bg-adminAccent" : "bg-parentAccent"
        } text-white px-4 py-2 rounded`}
      >
        Toggle Admin
      </button>

      {/* Render the child components based on the route */}
      <Outlet />
    </nav>
  );
};

export default NavBar;
