// HomePage.js
import { useEffect, useContext } from 'react';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Provider/UserProvider';
import { NewsLetters } from '../Components/homepage/NewsLetters';

const HomePage = () => {
  const { user, child, classActivity } = useContext(UserContext);
  const location = '/home/post';

  useEffect(() => {
    console.log(user);
    console.log(child);
    console.log(classActivity);
  }, [user, child, classActivity]);

  return (
    <div className="bg-white h-screen">
      <AppHeader input="News Letters" navigateLoc={location} />
      <div className="pb-[123px] flex justify-center">
        <NewsLetters />
      </div>
      <NavBar />
    </div>
  );
};

export default HomePage;
