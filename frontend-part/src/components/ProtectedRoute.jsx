// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = () => {

//     const token = localStorage.getItem("token")
//   return token ? <Outlet /> : <Navigate to="/login" />
// }

// export default ProtectedRoute

import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => { 
const [isAuthenticated, setIsAuthenticated] = useState(null);

useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile', { withCredentials: true })
      console.log(response.data)
    }
    catch (error) {
      console.error("Error fetching profile:", error)
      setIsAuthenticated(false)
    }
  }
  getProfile()

}, [])

if (isAuthenticated === null) {
  return <p>Checking Authentication... </p>
}
return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
export default ProtectedRoute
