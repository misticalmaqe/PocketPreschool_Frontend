import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//--------------COMPONENTS--------------//
import { UserContext } from '../../Provider/UserProvider';
import BackTeach from '../../Images/back_teacher.png';
import BackParent from '../../Images/back_parent.png';

const ProfileHeader2 = ({ input, navigateLoc }) => {
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(navigateLoc);
  };

  return (
    <div
      className={`${
        isAdmin
          ? 'bg-adminBackground text-adminText'
          : 'bg-parentBackground text-parentText'
      } w-100`}
    >
      {isAdmin ? (
        <img
          src={BackTeach}
          alt="Back"
          className="absolute top-8 left-7 w-10"
          onClick={navigateTo}
        />
      ) : (
        <img
          src={BackParent}
          alt="Back"
          className="absolute top-8 left-7 w-10"
          onClick={navigateTo}
        />
      )}
      <div className="content-container w-full h-20 ">
        <h1 className="text-[2.5em] text-center pt-[15px] font-bold ">
          <span className="inline-block max-w-full text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
            {input}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ProfileHeader2;
