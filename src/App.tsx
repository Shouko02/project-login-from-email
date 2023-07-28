import { useState,useEffect } from 'react'
// import './App.css'
import { GoogleLogin,GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate,Route,Routes,useNavigate } from 'react-router-dom'
import Profile from './components/Profile'

import Users from './components/Users'
import Login from './components/Login'




function App() {


  return (
    <div>
     <Routes>
     <Route  path="/" />
        <Route  path="/Login" element={<Login/>}/>
        <Route  path="/Profile" element={<Profile/>}/>
        <Route  path="/Users" element={<Users/>}/>
     </Routes>
    
    </div>
  )
}export default App