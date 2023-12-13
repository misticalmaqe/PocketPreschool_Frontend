/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext } from 'react';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';
import ProfileHeader2 from '../Components/profilePage/profileHeader2';

const StudentList = () => {
  const { isAdmin, child } = useContext(UserContext);

  const location = '/profile';

  //create component for header... with back button
  //
  return (
    <div className="bg-white h-screen">
      <ProfileHeader2 input="Student List" navigateLoc={location} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-white">
        {child.map((items) => (
          <div
            key={items.id}
            className="flex flex-row justify-left items-center text-adminText p-[20px] "
          >
            <div>
              <img
                src={items.displayPhoto}
                alt="display photo"
                className="w-20 h-20"
              />
            </div>
            <div className="px-[20px] font-medium">
              <h1 className="font-bold text-[1.3em]">{items.fullName}</h1>
              <h1>Birthday: {items.DateOfBirth}</h1>
              <h1>Allergies: {items.allergies}</h1>
              <h1>Medical History: {items.medicalHistory}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
