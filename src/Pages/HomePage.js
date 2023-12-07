// HomePage.js
import { useEffect, useContext } from 'react';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Provider/UserProvider';

const HomePage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  });

  return (
    <div>
      <AppHeader input="Home" />
      <div className=""></div>
      <NavBar />
    </div>
  );
};

export default HomePage;
