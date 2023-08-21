import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LikeChoice from './LikeChoice';
import DisChoice from './DisChoice';

import './style/LikeChoice.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FastForward } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs( {images,profile,ip ,resultData,toggleModal}:any) {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [unselected, setUnSelected] = useState<string[]>([]);
  const Swal = require('sweetalert2')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
 
 
  
  };
  const onNextClick =  React.useCallback ((nextValue: number )=> {
    setValue(nextValue);
  },[setValue])

  
  const onBackClick =  React.useCallback ((backValue: number )=> {
    setValue(backValue);
  },[setValue])


  const handleNextClick = () => {
    if (selectedCharacters.length === 10 || !null) {
      // navigate('/DisChoice');
      onNextClick(value + 1);
      resultData[0]=selectedCharacters;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'กรุณาเลือกรูปภาพให้คบ 10 รูป',
      });
    }
    

  };
  const handleSubmitClick = () => {
    if (unselected.length === 5 || !null ) {
      resultData[1]=unselected;
      console.log(resultData)

      navigate('/Result');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'กรุณาเลือกรูปภาพให้คบ 5 รูป',
      });
      
    }
  
    

  };

  return (
    <Box sx={{ width: '100%' ,margin:'0 auto'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'none' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LikeChoice selectedCharacters={selectedCharacters} setSelectedCharacters={setSelectedCharacters} images={images} />
        <Button variant="contained" onClick={toggleModal} >Close</Button>
   <Button variant="contained" onClick={() => {
 
  handleNextClick();
}}>   Next <FastForward/></Button>
      </CustomTabPanel>
  {/* .............................   */}
      <CustomTabPanel value={value} index={1}>
      <DisChoice images={images} unselected={unselected} setUnSelected={setUnSelected} selectedCharacters={selectedCharacters} setSelectedCharacters={setSelectedCharacters}/>
      <div style={{ textAlign:'center'}}>
          <Button variant="contained"  onClick={onBackClick.bind(null,value-1)} >Back</Button>

      <Button variant="contained" sx={{ml:10}} onClick={()=>{
        handleSubmitClick();
      }}>Submit</Button>
      </div>
    
      </CustomTabPanel>
     
    </Box>
  );
}
