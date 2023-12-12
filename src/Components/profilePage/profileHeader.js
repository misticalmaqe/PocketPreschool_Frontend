/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { UserContext } from '../../Provider/UserProvider';

const ProfileHeader = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { isAdmin, user, authenticated } = useContext(UserContext);
  const BEURL = process.env.REACT_APP_BE_URL;

  //function to get user details from BE
  const getUserInfo = async () => {
    const getInfo = await axios.get(`${BEURL}/user/${user.id}`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    setUserInfo(getInfo.data);
  };

  useEffect(() => {
    if (authenticated && user) {
      getUserInfo();
    }
    console.log(userInfo);
  }, [user, authenticated]);

  return (
    <div
      className={`${
        isAdmin
          ? 'bg-adminBackground text-adminText'
          : 'bg-parentBackground text-parentText'
      } h-[200px] flex flex-row justify-center items-center pt-[20px]`}
    >
      <div
        className={`${
          isAdmin ? 'border-adminText' : 'border-parentText'
        } p-[20px] mx-[10px] rounded-full border-2 mb-[10px] bg-white`}
      >
        <img
          src={userInfo.displayPhoto}
          alt="display photo"
          className="w-20 h-20"
        />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold p-[20px] mx-[10px]">
        {userInfo.fullName}
      </h1>
    </div>
  );
};

export default ProfileHeader;
