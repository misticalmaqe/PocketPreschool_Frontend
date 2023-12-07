// AppHeader.js
import { useContext } from 'react';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';

const AppHeader = ({ input }) => {
  const { isAdmin } = useContext(UserContext);
  return (
    <div
      className={`AppHeader ${
        isAdmin
          ? 'bg-adminBackground w-100 text-adminText'
          : 'bg-parentBackground text-parentText w-100'
      }`}
    >
      <div className="content-container w-full h-20 ">
        <h1 className="text-[2.5em] text-center pt-[15px] font-bold">
          {input}
        </h1>
      </div>
    </div>
  );
};

export default AppHeader;
