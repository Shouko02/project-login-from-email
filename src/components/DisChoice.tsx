import React, { useEffect, useState } from 'react'
import './style/DisChoice.css'
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from 'axios';
import Swal from 'sweetalert2';

function Content({images,unselected,setUnSelected,selectedCharacters}:any) {
  const Swal = require('sweetalert2')
  const [modal, setModal] = useState(false);
  const [buttonText, setButtonText] = useState('Open');
  const navigate = useNavigate()
  const ip = "http://192.168.1.22"
  const [resultData, setResultData] = useState<string[][]>([[], []]);
  const [imaLike,setImaLike]=useState<any>(null)
  // const [ checked, setChecked]=useState(
  //   new Array (84).fill("default")
  // )
  useEffect(() => {
    // Fetch character data from the API
    //useEffect: ใช้สำหรับโหลดข้อมูลตั้งแต่ครั้งแรกที่ component ถูกเรียกใช้งาน 
    //โดยใช้ fetch เพื่อดึงข้อมูลจาก API และใช้ shuffleArray ฟังก์ชันในการสลับลำดับของข้อมูลก่อนที่จะเก็บใน state ดังนี้:
    setImaLike(shuffleArray(images));
  }, []);

  const SelectedSuccess = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      Zindex:'99999',
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Selected 5 items. Click next below.',
    });
  };

  //
  useEffect(() => {
    if (unselected.length === 5) {
      SelectedSuccess();
    }
  }, [unselected]);

  //...................................

  // useEffect(() => {
  //   // Fetch character data from the API
  //   //useEffect: ใช้สำหรับโหลดข้อมูลตั้งแต่ครั้งแรกที่ component ถูกเรียกใช้งาน 
  //   //โดยใช้ fetch เพื่อดึงข้อมูลจาก API และใช้ shuffleArray ฟังก์ชันในการสลับลำดับของข้อมูลก่อนที่จะเก็บใน state ดังนี้:
  //   fetch(ip +':8000/api/find/all/choices')
  //     .then((response) => response.json())
  //     .then((images) => {
  //       // Shuffle the character data before setting it in the state
  //       setImages(shuffleArray(images));
  //     });
  // }, []);
  //...................................
  const shuffleArray = (array: []) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  if (imaLike === null) {
    return <center className='Loading'  style={{ fontSize: '50px', paddingTop: '3rem' }}>Loading...</center>;
    // แสดงข้อความ Loading หรือสิ่งอื่นๆ ในระหว่างที่รอให้ข้อมูลโหลดเสร็จ
  }
  // Function to handle character selection
  //handleCharacterSelection: ฟังก์ชันนี้ใช้ในการเพิ่มหรือลบตัวละครที่ถูกเลือกจาก 
  //selectedCharacters state ตามเงื่อนไขของจำนวนตัวละครที่สามารถเลือกได้ ถ้าตัวละครถูกเลือกแล้วก็จะถูกนำออก แต่ถ้ายังไม่ถูกเลือกก็จะเพิ่มเข้าไปใน state 

  //............................................
  const handleCharacterSelection = (characterId: string) => {
    if (unselected.includes(characterId)) {
      setUnSelected((prevSelected:any) => prevSelected.filter((choiceId:any) => choiceId !== characterId));
    } else {
      console.log(unselected)
      if (unselected.length < 5) {
        setUnSelected((prevSelected:any) => [...prevSelected, characterId]);
      }
    }
  };


  //toggleModal: ใช้สำหรับเปิดและปิดโหมดของ modal โดยให้รับค่าตัวแปร modal ในการกำหนดค่าใหม่ของ modal 
 

  //ฟังก์ชั่น handleNextClick จะถูกเรียกเมื่อผู้ใช้คลิกปุ่ม Next ในหน้าเลือกรูปภาพ ฟังก์ชั่นนี้จะตรวจสบว่าผู้ใช้เลือกรูปภาพไว้ 10 รูปหรือไม่ 
  //ถ้าเลือกรูปภาพไว้ครบ 10 รูป ก็จะนำผู้ใช้ไปยังหน้า /Result 
  // ถ้าผู้ใช้เลือกรูปภาพไม่ครบ 10 รูป ฟังก์ชั่นจะแสดงข้อความแจ้งเตือนผ่าน SweetAlert แสดงว่า "กรุณาเลือกรูปภาพคบ 10 รูป"
  // const handleNextClick = () => {
  //   if (unselected.length === 5) {
  //     navigate('/DisChoice');
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'กรุณาเลือกรูปภาพให้คบ 5 รูป',
  //     });
  //   }

  // };




  

  return (
    <div>
         <h1>ผู้นำ 4 ทิศ</h1>
      <h2>เลือก 5 ข้อข้างล่างนี้ที่ไม่ชอบ</h2>

      <div className='box-choice' style={{ flexWrap: "wrap", display: 'flex', }} >

{imaLike.map((character: any) => (

  <div className='img-box-choice' key={character.choiceId} >
    <div
      className={`item ${unselected.includes(character.choiceId) ? 'checked ' : 'default'}`}
    >
      {/* <img className='img-choice'
          src={character.image} alt={character.name} style={{ width: '100px' }}
          onClick={() => {
            handleCharacterSelection(character.id)
          }}
        /> */}
        
      <p className='text-choice1' style={{ width: '100%' }}
        onClick={() => {
          handleCharacterSelection(character.choiceId)
        }}
      >{character.choiceNameTh}</p>
    </div>
  </div>

))}
</div>






      

     

    </div>
  )
}

export default Content
