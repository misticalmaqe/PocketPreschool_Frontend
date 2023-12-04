import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../Images/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Your password has been sent to your email address that you have provided."
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-background h-screen text-text">
      {/* Back button at the top left */}
      <button
        onClick={handleBack}
        className="p-2 bg-green-700 text-white text-center cursor-pointer border-none rounded-full flex items-center justify-center ml-2 mt-2 absolute top-0 left-0"
        style={{
          width: "40px",
          height: "40px",
        }}
      >
        {"<"}
      </button>

      {/* Container for logoImage */}
      <div className="mb-5">
        <img src={logoImage} alt="PocketPreschool logo" className="w-80" />
      </div>

      {/* Container for the form */}
      <div className="pl-5 pt-5">
        <div className="flex justify-center items-center h-screen-1/2 text-center mb-10">
          {/* Form content */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label>Email:</label>
              <br />
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full p-4 bg-orange-100 border-none rounded-full box-border"
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-green-700 text-white cursor-pointer border-none rounded-full mx-auto flex items-center justify-center"
            >
              Send
            </button>
            <p className="mt-2">
              Your new password will be sent to your email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
