import React from 'react';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { ClassActivities } from '../Components/Activitiespage/ClassActivities';

const Activity = () => {
  const location = '/activity/post';
  return (
    <div className="bg-white h-screen">
      <AppHeader input="Class Activity" navigateLoc={location} />
      <div className="w-80% pb-[123px] flex justify-center">
        <ClassActivities />
      </div>
      <NavBar />
    </div>
  );
};

export default Activity;
