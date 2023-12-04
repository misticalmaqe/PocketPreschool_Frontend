// LogInPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../Images/logo.png";

const LogInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Check if the entered value contains "@"
    if (!email.includes("@")) {
      alert(
        "Please enter a valid email address. You are missing a @ from your email."
      );
      return; // Do not proceed with login if email is invalid
    }

    // Perform login logic here using email and password
    console.log("Logging in with:", { email, password });

    // Navigate to the home page ("/")
    navigate("/home");
  };

  const handleForgotPassword = () => {
    // Navigate to the forgot password page ("/forgotpassword")
    navigate("/forgotpassword");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Trigger the login logic
    handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background h-screen text-text">
      {/* Container for logoImage */}
      <div className="mb-5">
        <img src={logoImage} alt="PocketPreschool logo" className="w-80" />
      </div>
      <div className="flex justify-center items-center text-center w-full">
        {/* Adjusted the height in the following line */}
        <form onSubmit={handleFormSubmit}>
          {/* Container for Email and Password */}
          <div className="mb-7 text-left">
            <label>Email:</label>
            <br />
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full h-7 mb-3 p-5 bg-adminBackground border-none rounded-10 box-border"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full h-7 mb-3 p-5 bg-adminBackground border-none rounded-10 box-border"
            />
          </div>

          {/* Container for Sign In and Forgot Password */}
          <div className="text-left">
            <button
              type="submit"
              className="w-full h-7 bg-adminAccent text-white p-5 border-none rounded-10 cursor-pointer mb-2 flex items-center justify-center"
            >
              Sign In
            </button>
            <br />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full h-7 bg-transparent p-5 border-none rounded-10 cursor-pointer flex items-center justify-center"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
