import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
  // using React 18 or later)
  <Router>
    <App />
  </Router>
);
