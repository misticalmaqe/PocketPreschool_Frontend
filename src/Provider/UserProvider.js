import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // Global State Variables
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsLetters, setNewsLetters] = useState([]);
  const [newsImgs, setNewsImgs] = useState([]);

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
        newsLetters,
        setNewsLetters,
        newsImgs,
        setNewsImgs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
