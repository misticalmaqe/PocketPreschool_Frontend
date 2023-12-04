// Activity.js
import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";

const Activity = () => {
  const [isAdmin] = useState(true);

  return (
    <div>
      <AppHeader isAdmin={isAdmin}>
        <div
          className={`AppHeader ${
            isAdmin ? "bg-adminBackground" : "bg-parentBackground"
          } fixed top-0 left-0 w-full flex justify-center p-10`}
        >
          <NavBar />
          <h1 className="text-5xl font-bold">Class Activity</h1>
        </div>
      </AppHeader>
    </div>
  );
};

export default Activity;
