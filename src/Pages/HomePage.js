// HomePage.js
//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { NewsLetters } from '../Components/homepage/NewsLetters';

const HomePage = () => {
  const location = '/home/post';

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
