//  Component for authenticated routes, keeping authenticating logic separate
import React, { useContext } from 'react'
import AuthState from '../context/authState'
import { Navigate } from 'react-router-dom';
import AuthContext from "../context/authContext";



export default function ProtectedRoute({ children }) {

    const {authSuccess,isAuthLoading} = useContext(AuthContext);

if(isAuthLoading){
  console.log("Loading..")
  return <div>Loading....</div>
}


    
  return  authSuccess? children : <Navigate to={"/account"} replace/>
}
