// ProfilePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Provider/UserProvider';
import Arrow from '../Images/icons8-right-arrow-50.png';

const ProfilePage = () => {
  const { isAdmin } = useContext(UserContext);

  const buttonStyle = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white', // white color
    color: 'black', // black text color
    padding: '10px',
    borderRadius: '5px',
    margin: '5px 0',
    width: 'maxwidth', // Adjust the width as needed
  };

  const iconStyle = {
    marginLeft: '8px', // Adjust the margin as needed
  };

  return (
    <div>
      <AppHeader input="Profile Page" />

      <div className="flex flex-col items-center">
        {isAdmin ? (
          <>
            <Link to="/profile/student-list" style={buttonStyle}>
              <span>{'Student List'}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
            <Link to="/profile/attendance" style={buttonStyle}>
              <span>{'Attendance'}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
            <Link to="/profile/leave-application" style={buttonStyle}>
              <span>{'Leave Application'}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
            <Link to="/profile/create-parent-account" style={buttonStyle}>
              <span>{"Create Parent's Account"}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
            <Link to="/profile/settings" style={buttonStyle}>
              <span>{'Setting'}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Link to="/profile/settings" style={buttonStyle}>
              <span>{'Setting'}</span>
              <img src={Arrow} alt="Arrow Icon" style={iconStyle} />
            </Link>
            <hr className="my-4" />
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default ProfilePage;
