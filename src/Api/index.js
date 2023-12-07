import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BEURL = process.env.REACT_APP_BE_URL;

const apiRequest = axios.create({
  baseURL: BEURL,
  headers: {
    Authorization: localStorage.getItem('authToken'),
  },
});

// apiRequest.interceptors.request.use(
//   async (request) => {
//     //1. grab my auth token from local host
//     //2. use jwt.decode to grab info from inside
//     const decoded = jwtDecode(localStorage.getItem('authToken'));
//     const date = new Date(decoded.exp);
//     if (date <= new Date()) {
//       // //make axios call to get new token
//       // const response = await axios.get(`${BEURL}/user/jwtnewauthtoken`);
//       // const newToken = response.data.token;
//       // localStorage.setItem('authToken', newToken);

//       //send authToken and RefreshToken back to BE to check if valid. with axios.put
//       const authTokenLocal = localStorage.getItem('authToken');
//       const refreshTokenLocal = localStorage.getItem('refreshToken');
//       const response = await axios.put(
//         `${BEURL}/user/jwtNewAuthTokenValidation`,
//         { authTokenLocal, refreshTokenLocal }
//       );
//       // remove localstorage items
//       if (response.data.success === false) {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
//         return request;
//       }
//       //if succeeds save new authToken to localStorage.
//       else if (response.data.success === true) {
//         localStorage.setItem('authToken', response.data.newAuthToken);
//         return request;
//       }
//     }

//     return request;
//   },
//   (error) => {
//     console.log('something went wrong');
//   }
// );

export default apiRequest;
