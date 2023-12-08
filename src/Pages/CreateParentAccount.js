import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateParentAccount = () => {
  const navigate = useNavigate();

  // Use useEffect to navigate when the component is mounted
  useEffect(() => {
    // Automatically navigate to "/*"
    navigate("/updatefeature");
  }, [navigate]);

  return <h1>Create Parent Account page</h1>;
};

export default CreateParentAccount;
