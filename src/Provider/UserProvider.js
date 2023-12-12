import React, { createContext, useState, useEffect } from 'react';
import apiRequest from '../Api/index';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext();
// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // Global State Variables
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsLetters, setNewsLetters] = useState([]);
  const [newsImgs, setNewsImgs] = useState([]);
  const [classActivity, setClassActivity] = useState([]);
  const [classActImgs, setClassActImgs] = useState([]);
  const [child, setChild] = useState([]);
  const BEURL = process.env.REACT_APP_BE_URL;

  //set user based on local storage
  const userDetails = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {
      const decoded = jwtDecode(authToken);
      setUser({ id: decoded.id, email: decoded.email }); // Set the user using the decoded token payload
      setIsAdmin(decoded.isAdmin);
      setAuthenticated(true);
    }
  };

  //-----------FOR TEACHER-----------//
  //function to get children info for teacher
  const fetchChildrenInfoTeacher = async () => {
    //get the grade first
    const getGrade = await axios.get(`${BEURL}/teacherclass/${user.id}`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    //get children based on the grade they're in
    const getChildren = await apiRequest.get(
      `${BEURL}/user/childg/${getGrade.data}`,
      {
        headers: { Authorization: localStorage.getItem('authToken') },
      }
    );
    const allChildren = getChildren.data;
    setChild(allChildren);
  };

  //-----------FOR PARENT-----------//
  //function to get children info for parent
  const fetchChildrenInfoParent = async () => {
    const childrenRes = await apiRequest.get(`${BEURL}/user/child/${user.id}`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    setChild(childrenRes.data);
  };

  useEffect(() => {
    if (!authenticated) {
      userDetails();
    }
    try {
      if (isAdmin && authenticated && user && user.id) {
        fetchChildrenInfoTeacher();
      } else if (!isAdmin && authenticated && user && user.id) {
        fetchChildrenInfoParent();
      }
      console.log(child);
    } catch (error) {
      console.log('failed to fetch children?');
    }
  }, [user, isAdmin, authenticated, setChild]);

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
        classActivity,
        setClassActivity,
        classActImgs,
        setClassActImgs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
