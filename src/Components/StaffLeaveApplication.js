import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StaffLeaveApplication = () => {
  const navigate = useNavigate();

  // Use useEffect to navigate when the component is mounted
  useEffect(() => {
    // Automatically navigate to "/*"
    navigate("/*");
  }, [navigate]);

  // The component renders an h1 element
  return <h1>Staff Leave Application page</h1>;
};

export default StaffLeaveApplication;
