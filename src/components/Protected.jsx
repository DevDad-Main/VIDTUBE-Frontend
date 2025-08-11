import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { fetchData } from './utils'

function Protected({ children }) {
  let token = sessionStorage.getItem("token");
  console.log(token);
  return token ? children : <Navigate to={'/login'} /> 
}

export default Protected;
