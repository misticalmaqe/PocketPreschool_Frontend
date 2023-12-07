import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // State variables for user data and isAdmin
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Effect hook to run whenever the user changes
  useEffect(() => {
    // Function to check if the user is an admin
    const checkAdminStatus = () => {
      // Check if there is a user and the user has an "admin" role (customize this based on your actual user data structure)
      if (user && user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    // Check admin status whenever the user changes
    checkAdminStatus();
  }, [user]);

  // Provide the user context to the component tree
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        setIsAdmin, // Include the setIsAdmin function in the context value
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
