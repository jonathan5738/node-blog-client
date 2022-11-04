import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
function IsLoggedIn() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  return currentUser ? <Outlet/> : <Navigate to="/accounts/login"/>
}

export default IsLoggedIn