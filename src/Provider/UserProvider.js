import React, { createContext, useState, useEffect } from 'react';
import apiRequest from '../Api/index';

export const UserContext = createContext();

// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // Global State Variables
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsLetters, setNewsLetters] = useState([]);
  const [newsImgs, setNewsImgs] = useState([]);
  const [child, setChild] = useState([]);
  const BEURL = process.env.REACT_APP_BE_URL;

  //get children info
  const fetchChildrenInfo = async () => {
    const childrenRes = await apiRequest.get(`${BEURL}/user/child/${user.id}`);
    setChild(childrenRes.data);
  };

  useEffect(() => {
    if (isAdmin === false && authenticated === true) {
      fetchChildrenInfo();
    }
  }, [user]);

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
        child,
        setChild,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
