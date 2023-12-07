import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import UserContextProvider from "./Provider/UserProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  // using React 18 or later)
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
);
