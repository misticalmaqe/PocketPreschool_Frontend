// LogInPage.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import logoImage from '../Images/logo.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';

const LogInPage = () => {
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, setAuthenticated, setUser, setIsAdmin } =
    useContext(UserContext);

  useEffect(() => {
    // Enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleForgotPassword = () => {
    // Navigate to the forgot password page ("/forgotpassword")
    navigate('/forgotpassword');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert(
        'Please enter a valid email address. You are missing a @ from your email.'
      );
    } else {
      try {
        const response = await axios.post(`${BEURL}/user/jwtsignin`, {
          email,
          password,
        });
        if (response.data.success) {
          const authToken = response.data.authToken;
          const refreshToken = response.data.refreshToken;
          // Store token and payload in localStorage
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          // Decode the token and set the user
          const decoded = jwtDecode(authToken);
          setUser({ id: decoded.id, email: decoded.email }); // Set the user using the decoded token payload
          setIsAdmin(decoded.isAdmin);
          // Set authenticated state
          setAuthenticated(true);
        }
      } catch (error) {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  useEffect(() => {
    if (authenticated === true) {
      navigate('/home');
    }
  }, [authenticated]);

  if (authenticated) {
    return <Navigate to="/home" />;
  } else {
    return (
      <div className="flex flex-col items-center justify-start bg-white h-screen text-black pt-[100px]">
        {/* Container for logoImage */}
        <img src={logoImage} alt="PocketPreschool logo" className="w-80" />
        <div className="flex justify-center items-center text-center w-full">
          {/* Adjusted the height in the following line */}
          <form onSubmit={handleFormSubmit}>
            {/* Container for Email and Password */}
            <div className="mb-7 text-left font-bold">
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
              <br />
              <label>Password:</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="w-full h-7 mt-2 mb-5 p-5 bg-adminBackground border-none rounded-10 box-border rounded-xl"
              />
            </div>

            {/* Container for Sign In and Forgot Password */}
            <div className="text-left">
              <button
                type="submit"
                className="w-full h-7 bg-adminAccent text-white p-5 border-none rounded-xl cursor-pointer mb-2 flex items-center justify-center"
              >
                Sign In
              </button>
              <br />
              <h1
                onClick={handleForgotPassword}
                className="w-full cursor-pointer text-center"
              >
                Forgot Password?
              </h1>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default LogInPage;
