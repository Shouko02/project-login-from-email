import '../components/style/Home_page.css'
import LikeChoice from '../components/LikeChoice'
import Navbar from '../components/Navbar'
import BasicTabs from '../components/Tabs';
import Modal from '../components/Modal';
function Users({profile,setUserHis,images,ip ,resultData}:any) {

    const backgroundImageUrl = process.env.PUBLIC_URL + '/imageswallpaper/b.jpeg'; 
    const divStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'repeat-x',
        width:' 100vw',
        height: '100vh',
        maxWidth:'100%',
        maxHeight:'100%',
        
        // Set the desired height for the element
    };


    return (
        <nav style={divStyle} >
            
            <Navbar profile={profile} setUserHis={setUserHis} ip={ip}/>

           
            
                <Modal images={images} profile={profile} ip={ip} resultData={resultData}/>
           

        </nav>
    );
}

export default Users
