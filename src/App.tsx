import { useState,useEffect } from 'react'
// import './App.css'
import { GoogleLogin,GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate,Route,Routes,useNavigate } from 'react-router-dom'
// import checkUserData from './components/Profile'

import Home_page from './pages/Home_page'
import Login from './pages/Login'
import Result from './pages/Result'

import { checkUserData } from './components/checkUserData'

import DisChoice from './components/DisChoice'
import BasicTabs from './components/Tabs'
import History from './pages/History'
import Overview from './pages/Overview'



function App() {
  const Navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null);
  const [userHis, setUserHis] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [resultData] = useState<string[][]>([[], []]);
const [result , setResult] = useState<any>(null);


  // const ip = "http://192.168.1.11"
  const ip = "http://localhost"
  useEffect(() => {
    const userData = checkUserData();
    if (userData) {
      Navigate('/DisChoice'); // Correct function for navigation
    }else {
      Navigate('/Login')// No user data found, handle as needed
  }
  }, []);
  useEffect(() => {
    // Fetch character data from the API
    //useEffect: ใช้สำหรับโหลดข้อมูลตั้งแต่ครั้งแรกที่ component ถูกเรียกใช้งาน 
    //โดยใช้ fetch เพื่อดึงข้อมูลจาก API และใช้ shuffleArray ฟังก์ชันในการสลับลำดับของข้อมูลก่อนที่จะเก็บใน state ดังนี้:
    fetch('https://api-text.shouko02.repl.co/characters')
      .then((response) => response.json())
      .then((images) => {
        // Shuffle the character data before setting it in the state
        setImages(images);
      });
  }, []);
  return (
    <div>
     
     <Routes>
        <Route  path="/" />
        <Route  path="/Login" element={<Login profile={profile} setProfile={setProfile} />}/>
        <Route  path="/Home_page" element={<Home_page profile={profile} setUserHis={setUserHis} images={images} ip={ip} resultData={resultData}/>}/>

         <Route  path="/History" element={<History profile={profile} userHis={userHis} images={images} />}/>
         <Route  path="/Result" element={<Result profile={profile} resultData={resultData} ip={ip}  result={result} setResult={setResult}/> }/>
         <Route  path="/Overview" element={<Overview profile={profile} ip={ip}   resultData={resultData}  result={result} />} />


        
     </Routes>
    
    </div>
  )
}export default App