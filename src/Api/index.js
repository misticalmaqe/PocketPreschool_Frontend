import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const DBPORT = process.env.REACT_APP_DB_PORT;
const apiRequest = axios.create({
  baseURL: DBPORT,
  headers: {
    Authorization: 'MY AUTH TOKEN GOES HERE',
  },
});

apiRequest.interceptors.request.use(
  async (request) => {
    console.log('hello, Im in my interceptor');
    //1. grab my auth token from local host
    //2. use jwt.decode to grab info from inside
    const decoded = jwtDecode(localStorage.getItem('authToken'));
    const date = new Date(decoded.exp);
    if (date <= new Date()) {
      //make axios call to get new token
      const response = await axios.get(`${DBPORT}/user/jwtnewauthtoken`);
      const newToken = response.data.token;
      localStorage.setItem('authToken', newToken);
    }

    return request;
  },
  (error) => {
    console.log('something went wrong');
  }
);

export default apiRequest;
