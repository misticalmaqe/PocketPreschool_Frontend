import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../Images/logo.png';
import Back from '../Images/back_parent.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Your password has been sent to your email address that you have provided.'
    );
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white h-screen text-text pt-[100px]">
      {/* Back button at the top left */}
      <img
        src={Back}
        alt="PocketPreschool logo"
        className="absolute top-5 left-5 w-10"
        onClick={handleBack}
      />

      {/* Container for logoImage */}
      <img src={logoImage} alt="PocketPreschool logo" className="w-80" />
      {/* Container for the form */}
      <div className="pt-5">
        <div className="flex flex-col justify-center items-center text-center font-bold text-black mb-10">
          {/* Form content */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left font-bold">
              <label>Email:</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="w-full h-7 mt-2 mb-8 p-5 bg-adminBackground border-none rounded-10 box-border rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full h-7 bg-adminAccent text-white p-5 border-none rounded-xl cursor-pointer mb-2 flex items-center justify-center"
            >
              Send
            </button>
            <p className="mt-8 font-light italic">
              Your new password will be sent to your email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
