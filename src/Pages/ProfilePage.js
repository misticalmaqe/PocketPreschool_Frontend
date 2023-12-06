// ProfilePage.js
import React from "react";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";

const ProfilePage = ({ isAdmin, onToggleAdmin }) => {
  return (
    <div>
      <AppHeader isAdmin={isAdmin}>
        <NavBar isAdmin={isAdmin} onToggleAdmin={onToggleAdmin} />
        <h1 className="text-5xl text-center font-bold">Profile Page</h1>
      </AppHeader>
    </div>
  );
};

export default ProfilePage;
