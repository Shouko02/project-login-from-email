import { useState,useEffect } from 'react'
// import './App.css'
import { GoogleLogin,GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate,Route,Routes,useNavigate } from 'react-router-dom'
// import checkUserData from './components/Profile'

import Users from './components/Users'
import Login from './components/Login'

import { checkUserData } from './components/checkUserData'


function App() {
  const Navigate = useNavigate(
    
  )
  const handleNavigateToLogin = () => {
    // Navigate to '/Login' route
    Navigate('/Login');
  };
  useEffect(() => {
    const userData = checkUserData();
    if (!userData) {
      Navigate('/Login'); // Correct function for navigation
    }
  }, []);
 
  return (
    <div>
     
     <Routes>
      
        <Route  path="/"  element={<Login/>} />
        <Route  path="/Login" element={<Login/>}/>
        {/* <Route  path="/Profile" element={<Profile/>}/> */}
        <Route  path="/Users" element={<Users/>}/>
        

     </Routes>
    
    </div>
  )
}export default App