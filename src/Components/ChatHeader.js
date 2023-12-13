// AppHeader.js
import { useContext } from 'react';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';

const ChatHeader = ({ input }) => {
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
        <h1 className="text-[2.5em] text-center pt-[15px] font-bold ">
          <span className="inline-block max-w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
            {input}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ChatHeader;
