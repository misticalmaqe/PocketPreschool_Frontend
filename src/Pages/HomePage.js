// HomePage.js
import React from "react";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";

const HomePage = ({ isAdmin, onToggleAdmin }) => {
  return (
    <div>
      <AppHeader isAdmin={isAdmin}>
        <NavBar isAdmin={isAdmin} onToggleAdmin={onToggleAdmin} />
        <h1 className="text-5xl text-center font-bold">Home</h1>
      </AppHeader>
    </div>
  );
};

export default HomePage;
