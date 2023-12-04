// AppHeader.js
import React from "react";

const AppHeader = ({ isAdmin, children }) => {
  return (
    <div
      className={`AppHeader ${
        isAdmin ? "bg-adminBackground" : "bg-parentBackground"
      }`}
      style={{ width: "100px" }}
    >
      <div className="content-container">{children}</div>
    </div>
  );
};

export default AppHeader;
