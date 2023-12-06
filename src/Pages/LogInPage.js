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
  const DBPORT = process.env.REACT_APP_DB_PORT;
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

  const handleLogin = async () => {
    // Check if the entered value contains "@"
    if (!email.includes('@')) {
      alert(
        'Please enter a valid email address. You are missing a @ from your email.'
      );
    } else {
      try {
        const response = await axios.post(`${DBPORT}/user/jwtsignin`, {
          email,
          password,
        });
        if (response.data.success) {
          console.log(response.data);
          const authToken = response.data.authToken;
          const refreshToken = response.data.refreshToken;
          // Set authenticated state
          setAuthenticated(true);
          // Store token and payload in localStorage
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          // Decode the token and set the user
          const decoded = jwtDecode(authToken);
          setUser({ id: decoded.id, email: decoded.email }); // Set the user using the decoded token payload
          setIsAdmin(decoded.isAdmin);
          navigate('/home');
        }
      } catch (error) {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the forgot password page ("/forgotpassword")
    navigate('/forgotpassword');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (authenticated) {
    return <Navigate to="/home" />;
  } else {
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
  }
};

export default LogInPage;
