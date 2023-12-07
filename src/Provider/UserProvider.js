import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // Global State Variables
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const DBPORT = process.env.REACT_APP_DB_PORT;

  // Effect hook to run whenever the user changes
  useEffect(() => {}, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
