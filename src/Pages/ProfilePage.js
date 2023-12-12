import { useContext } from 'react';
import { Link } from 'react-router-dom';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import ProfileHeader from '../Components/profilePage/profileHeader';
import { UserContext } from '../Provider/UserProvider';
import ArrowTeach from '../Images/arrow_teacher.png';
import ArrowParent from '../Images/arrow_parent.png';

const ProfilePage = () => {
  const { isAdmin } = useContext(UserContext);

  return (
    <div>
      <ProfileHeader />
      <div className="flex flex-col items-center">
        {isAdmin ? (
          <div className="bg-white h-screen w-full text-[1.3em] text-adminText">
            <div className="w-full p-[20px]">
              <Link
                to="/profile/student-list"
                className="flex flex-row justify-between items-center"
              >
                <h1 className=" font-bold">Student List</h1>
                <img src={ArrowTeach} alt="Arrow Icon" className="h-10" />
              </Link>
            </div>
            <hr className=" rounded-full border-[0.1em] border-adminText" />
            <div className="w-full p-[20px]">
              <Link
                to="/profile/settings"
                className="flex flex-row justify-between items-center"
              >
                <h1 className=" font-bold">Settings</h1>
                <img src={ArrowTeach} alt="Arrow Icon" className="h-10" />
              </Link>
            </div>
            <hr className=" rounded-full border-[0.1em] border-adminText" />
            <div className="w-full p-[20px] flex flex-row justify-between items-center bg-slate-600 text-slate-500">
              <h1 className=" font-bold">Attendance(future feature)</h1>
              {/* <Link
                to="/profile/attendance"
                className="flex flex-row justify-between items-center"
              >
                <h1 className=" font-bold">Attendance</h1>
                <img src={ArrowTeach} alt="Arrow Icon" className="h-10" />
              </Link> */}
            </div>
            <hr className=" rounded-full border-[0.1em] border-adminText" />
            <div className="w-full p-[20px] flex flex-row justify-between items-center bg-slate-600 text-slate-500">
              <h1 className=" font-bold">Leave Application(future feature)</h1>
              {/* <Link
                to="/profile/leave-application"
                className="flex flex-row justify-between items-center"
              >
                <h1 className=" font-bold">Leave Application</h1>
                <img src={ArrowTeach} alt="Arrow Icon" className="h-10" />
              </Link> */}
            </div>
            <hr className=" rounded-full border-[0.1em] border-adminText" />
            <div className="w-full p-[20px] flex flex-row justify-between items-center bg-slate-600 text-slate-500">
              <h1 className=" font-bold">
                Create Parent's Account(future feature)
              </h1>
              {/* <Link
                to="/profile/create-parent-account"
                className="flex flex-row justify-between items-center"
              >
                <h1 className=" font-bold">Create Parent's Account</h1>
                <img src={ArrowTeach} alt="Arrow Icon" className="h-10" />
              </Link> */}
            </div>
            <hr className=" rounded-full border-[0.1em] border-adminText" />
          </div>
        ) : (
          <div className="bg-white h-screen w-full text-parentText">
            <div className="w-full p-[20px]">
              <Link
                to="/profile/settings"
                className="flex flex-row justify-between items-center"
              >
                <h1 className="text-[1.3em] font-bold">Settings</h1>
                <img src={ArrowParent} alt="Arrow Icon" className="h-10" />
              </Link>
            </div>
            <hr className=" rounded-full border-[0.1em] border-parentText" />
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default ProfilePage;
