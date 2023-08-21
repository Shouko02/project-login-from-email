import React, { useEffect, useState } from 'react'
import './style/History.css'
import { useNavigate } from 'react-router-dom';
import { FastRewind } from '@mui/icons-material';
const backgroundImageUrl = process.env.PUBLIC_URL + '/imageswallpaper/b.jpeg';
const divStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '900px',
  // Set the desired height for the element
};

function History({ profile, userHis, images }: any) {
  const navigate = useNavigate();
  const getProfile = () => {
    navigate('/Login')
  }

  const getlogo = (name: any) => {
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
  const handleBack = () => {
    navigate('/Home_page')
  }

  return (
    <div style={divStyle}>
      {profile ? (
        <>
          <div className='box-images'>
            <img className='img-pro' src={profile.imageUrl} alt='user image'
            />
            {profile.name}
          </div>


          <div className='containerP' >
            <h1 className='text-header'>ประวัติของคุณ</h1><br />
            <div className='history'  >
      

                {userHis ? (
                  <div  style={{width:'100%'}}>
                    {userHis.map((his: any) => (<div key={his.id}>

                      <div className='date-his'>{his.dates}</div>
                     
                      <div className='table-A' >
                        <div className='table-his' >
                          {/* <div> <b>numberID:</b>{his.id}</div> */}

                          {/* <div><b>Like</b>{his.likes}</div> */}

                          <div className='Like-box'>
                            <b className='section1'>เลือก 10 ลักษณะที่บ่งบอกความเป็นคุณ</b>
                            <div style={{ display: "flex", flexFlow: "wrap" }}>
                              {his.likes.map((id: any) => (
                                <div className='choice-id' >{images[id - 1].choiceNameTh}</div>
                              ))}
                            </div>
                          </div>

                          {/* <div><b>DisLike</b>{his.dislikes}</div> */}
                          {/* <div className='none-box'></div> */}


                          <div className='DisLike-box' >
                            <b className='section2' >เลือก 5 ลักษณะที่ไม่ใช่คุณ</b>
                            <div style={{ display: "flex", flexFlow: "wrap" }} >
                              {his.dislikes.map((id: any) => (
                                <div className='choice-id' >
                                  {images[id - 1].choiceNameTh}
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                        <div className='img-info'>
                          {getlogo(his.categoryName)}
                        </div>

                      </div>

<br />
                     

                      {/* <div>{his.userId}</div> */}



                    </div>))}
                  </div>
                ) : (
                  <>
                    <div>
                      ยังไม่มีข้อมู
                    </div>
                  </>
                )}



                {/* <div className='show-img'>

                </div> */}

         

            </div>


          </div>
        </>
      ) : (
        <>
          {getProfile()}
        </>
      )}

      <button className='btn-back' onClick={handleBack} > <FastRewind /><b className='p-back'>Back</b> </button>
    </div>
  )
}

export default History
