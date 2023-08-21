import React, { useEffect, useState } from 'react'
import './style/Overview.css'
import {  useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Overview({profile,ip,resultData,result,setResult}:any) {
    const backgroundImageUrl = process.env.PUBLIC_URL + '/imageswallpaper/b.jpeg'; 
    const divStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '900px',
        // Set the desired height for the element
    };
    const [overview,setOverview]=useState<any>(null)
    const navigate= useNavigate()

    useEffect(()=>{
        fetch(ip+':8000/api/get/overview')
            .then(rep=>rep.json())
            .then(res=>{
              console.log(res)
              setOverview(res)
            })
            .catch(err=>console.log(err))
      
        
      
      },[])



const handleNextHome=()=>{
    navigate('/Home_page');
}



  return (
    <div style={divStyle}>
        {overview?(
       
      <div className='table-container-A'>
        <div className='table-container-B'>
        <h1>Result Overview</h1>
            <div className='table-container-C'>
                <div><h1>{overview[2].people} users played</h1></div>
                <div className='card-Over'>
                    <div >
                    <ul className='card-box'>
                    <img className='card-img' src="/images/Bear.jpg" alt="" />
                    <div className='box-dow-A'>NEW WORK ACADEMY</div>
                    </ul>
                    <div className='capers'>{overview[2].percent}</div>
                    </div>
                    <div>
                    <ul className='card-box'>
                    <img className='card-img'src="/images/Cow.jpg" alt="" style={{paddingBottom:'4px'}} />
                    <div className='box-dow-A'>NEW WORK ACADEMY</div>
                    </ul>
                    <div className='capers'>{overview[0].percent}</div>
                    </div>
                    <div>
                    <ul className='card-box'>
                    <img className='card-img'src="/images/Falcon.jpg" alt=""  style={{paddingBottom:'0px'}}/>
                    <div className='box-dow-A'>NEW WORK ACADEMY</div>
                    </ul>
                    <div className='capers'>{overview[3].percent}</div>
                    </div>
                    <div>
                    <ul className='card-box'>
                    <img className='card-img'src="/images/Rat.jpg" alt="" />
                    <div className='box-dow-A'>NEW WORK ACADEMY</div>
                    </ul>
                    <div className='capers'>{overview[1].percent}</div>
                    </div>
                 
                   
                    
                </div>
                <h1>Your {result.name}</h1>
                <br />
                <br />
<Button variant="contained" className='btn-complete' onClick={handleNextHome}>Complete</Button>
            </div>

        </div>
      </div>
        ):(<div>

        </div>)}
    </div>
  )
}

export default Overview
