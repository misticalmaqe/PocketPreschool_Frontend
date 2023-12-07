import React, { useContext } from "react";
import { UserContext } from "../Provider/UserProvider"; // Update the path based on the actual location

const AppHeader = ({ children }) => {
  const { isAdmin } = useContext(UserContext);

  return (
    <div
      className={`AppHeader ${
        isAdmin ? "bg-adminBackground" : "bg-parentBackground"
      }`}
      style={{ width: "100%" }}
    >
      <div className="content-container">{children}</div>
    </div>
  );
};

export default AppHeader;
