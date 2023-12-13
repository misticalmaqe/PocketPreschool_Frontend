/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';
import ProfileHeader2 from '../Components/profilePage/profileHeader2';

const Setting = () => {
  const { user, authenticated, isAdmin, setAuthenticated } =
    useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);

  const BEURL = process.env.REACT_APP_BE_URL;

  const navigate = useNavigate();
  const location = '/profile';

  //function to get user details from BE
  const getUserInfo = async () => {
    const getInfo = await axios.get(`${BEURL}/user/${user.id}`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    setUserInfo(getInfo.data);
  };

  // Function to handle the change password logic
  const changePassword = async () => {
    try {
      // Make a PUT request to change the password
      const response = await axios.put(
        `${BEURL}/user/change/changePassword`,
        {
          userId: user.id,
          currentPassword: password,
          newPassword: confirmPassword,
        },
        {
          headers: { Authorization: localStorage.getItem('authToken') },
        }
      );

      if (response.data.success) {
        setIsChangePasswordClicked(false);
        alert('Password changed successfully!');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  };

  //function to logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthenticated(false);
    setPassword('');
    setConfirmPassword('');
    navigate('/');
  };

  useEffect(() => {
    if (authenticated && user) {
      getUserInfo();
    }
  }, [user, authenticated]);

  if (isAdmin) {
    return (
      <div className="text-adminText bg-white h-screen font-bold">
        <ProfileHeader2 input="Profile" navigateLoc={location} />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Display Photo: </h1>
          <div className="border-adminText p-[20px] mx-[10px] rounded-full border-2 mb-[10px] bg-white">
            <img
              src={userInfo.displayPhoto}
              alt="display photo"
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>
        <hr className="rounded-full border-[0.1em] border-adminText" />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Email: </h1>
          <h1 className="text-[1.5em] font-medium">{userInfo.email} </h1>
        </div>
        <hr className="rounded-full border-[0.1em] border-adminText" />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Name: </h1>
          <h1 className="text-[1.5em] font-medium">{userInfo.fullName} </h1>
        </div>
        <hr className="rounded-full border-[0.1em] border-adminText" />
        {!isChangePasswordClicked && (
          <div
            onClick={() => setIsChangePasswordClicked(true)}
            className="p-[10px] cursor-pointer"
          >
            <h1 className="text-[1.5em] text-center">Change Password</h1>
          </div>
        )}
        {isChangePasswordClicked && (
          <div className="flex flex-col items-center p-[10px]">
            <h1 className="text-[1.5em] font-bold mr-5">Current Password:</h1>
            <input
              className="h-[2rem] border-none rounded-xl border-adminText bg-adminBackground pl-[5px] my-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-[1.5em] font-bold mr-5">New Password:</label>
            <input
              className="h-[2rem] border-none rounded-xl border-adminText bg-adminBackground pl-[5px] my-1"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Button to trigger password change */}
            <button
              className="rounded-xl p-[10px] mt-5 bg-adminText text-white"
              onClick={changePassword}
            >
              Change Password
            </button>
          </div>
        )}
        <hr className="rounded-full border-[0.1em] border-adminText" />
        <div
          className="bg-adminBackground text-center p-[10px] cursor-pointer"
          onClick={() => logout()}
        >
          <h1 className="text-[2em] text-bold">Logout</h1>
        </div>
        <hr className="rounded-full border-[0.1em] border-adminText" />
      </div>
    );
  } else {
    return (
      <div className="text-parentText bg-white h-screen font-bold">
        <ProfileHeader2 input="Profile" navigateLoc={location} />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Display Photo: </h1>
          <div className="border-parentText p-[20px] mx-[10px] rounded-full border-2 mb-[10px] bg-white">
            <img
              src={userInfo.displayPhoto}
              alt="display photo"
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>
        <hr className="mt-[2px] rounded-full border-[0.1em] border-parentText" />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Email: </h1>
          <h1 className="text-[1.5em] font-medium">{userInfo.email} </h1>
        </div>
        <hr className="mt-[2px] rounded-full border-[0.1em] border-parentText" />
        <div className="flex flex-row items-center justify-evenly p-[10px]">
          <h1 className="text-[1.5em]">Name: </h1>
          <h1 className="text-[1.5em] font-medium">{userInfo.fullName} </h1>
        </div>
        <hr className="mt-[2px] rounded-full border-[0.1em] border-parentText" />
        {!isChangePasswordClicked && (
          <div
            onClick={() => setIsChangePasswordClicked(true)}
            className="p-[10px] cursor-pointer"
          >
            <h1 className="text-[1.5em] text-center">Change Password</h1>
          </div>
        )}
        {isChangePasswordClicked && (
          <div className="flex flex-col items-center p-[10px]">
            <h1 className="text-[1.5em] font-bold mr-5">Current Password:</h1>
            <input
              className="h-[2rem] border-none rounded-xl border-parentText bg-parentBackground pl-[5px] my-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-[1.5em] font-bold mr-5">New Password:</label>
            <input
              className="h-[2rem] border-none rounded-xl border-parentText bg-parentBackground pl-[5px] my-1"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Button to trigger password change */}
            <button
              className="rounded-xl p-[10px] mt-5 bg-parentText text-white"
              onClick={changePassword}
            >
              Change Password
            </button>
          </div>
        )}
        <hr className="mt-[2px] rounded-full border-[0.1em] border-parentText" />
        <div
          className="bg-parentBackground text-center p-[10px] cursor-pointer"
          onClick={() => logout()}
        >
          <h1 className="text-[2em] text-bold">Logout</h1>
        </div>
        <hr className="rounded-full border-[0.1em] border-parentText" />
      </div>
    );
  }
};

export default Setting;
