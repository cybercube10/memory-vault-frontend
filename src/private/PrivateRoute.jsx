import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Assuming you store JWT token in localStorage
  
  // If the user is not authenticated, redirect them to the login page
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
