// HomePage.js
import { useEffect, useContext } from 'react';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Provider/UserProvider';
import { NewsLetters } from '../Components/homepage/NewsLetters';

const HomePage = () => {
  const { user, child } = useContext(UserContext);
  const location = '/home/post';

  useEffect(() => {
    console.log(user);
    console.log(child);
  }, []);

  return (
    <div className="bg-white h-screen">
      <AppHeader input="Home" navigateLoc={location} />
      <div className="w-80% pb-[123px] flex justify-center">
        <NewsLetters />
      </div>
      <NavBar />
    </div>
  );
};

export default HomePage;
