// AppHeader.js
import React from "react";
import PropTypes from "prop-types";

const AppHeader = ({ isAdmin, children }) => {
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

AppHeader.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppHeader;
