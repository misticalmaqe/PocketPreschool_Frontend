// HomePage.js
import { useEffect, useContext } from 'react';

//--------------COMPONENTS--------------//
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Provider/UserProvider';

const HomePage = () => {
  const { user, isAdmin } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    console.log(isAdmin);
  });

  return (
    <AppHeader>
      <NavBar isAdmin={isAdmin} />
      <h1 className="text-5xl text-center font-bold">Home</h1>
    </AppHeader>
  );
};

export default HomePage;
