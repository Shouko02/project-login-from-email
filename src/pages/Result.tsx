import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './style/Result.css'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
function Result({profile,resultData,ip ,result,setResult}:any) {


  const backgroundImageUrl = process.env.PUBLIC_URL + '/imageswallpaper/b.jpeg'; 
  const divStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '900px',
      // Set the desired height for the element
  };
const navigate = useNavigate()
const getlogoResult = (name: any) => {
  if (name === "Bull") {
    return (<img className='img-card' src='images/Cow.jpg' />)
  }
  if (name === "Rat") {
    return (<img className='img-card' src='images/Rat.jpg' />)
  }
  if (name === "Bear") {
    return (<img className='img-card' src='images/Bear.jpg' />)
  }
  if (name === "Falcon") {
    return (<img className='img-card' src='images/Falcon.jpg' />)
  }
}

useEffect(()=>{
  fetch(ip + ':8000/api/get/result', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: "POST",
    redirect: 'follow',
    body: JSON.stringify({
      "userEmail":profile.email,
      "userData":resultData
    })})
    .then(rep=>rep.json())
    .then(res=>{
      console.log(res)
      fetch(ip+':8000/api/get/category?name='+res.description)
      .then(rep=>rep.json())
      .then(res=>{
        setResult(res) 
        console.log(res)});
    })
    .catch(err=>{console.log(err)})

    console.log(result)
  

},[])

 const handleNextOverview =()=>{
  navigate('/Overview')
 }

    
  return (
    <div style={divStyle}>
    <div className='container-A'>
    <div className='container-B'>
      <h1>Your Result</h1>

    {result ? (
      
    <div className='container-C'>

      <ul className='ul-img'>
        <div >
        {getlogoResult(result.name)}
        </div>
        
        <div className='box-dow'>
NEW WORK ACADEMY
        </div>
      </ul>

<h1>{result.name}</h1>

      <div className='description'>
        {result.descriptionTh}

      </div>

    </div>
    
    
    ):(
        
              <div>Not DaTa</div>
      )}
    </div>
    <Button variant="contained" className='btn-overview' onClick={handleNextOverview}>Overview</Button>
    </div>
    </div>
  )
}

export default Result
