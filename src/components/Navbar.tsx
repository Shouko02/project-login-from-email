import React, { useState, useEffect, useRef } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom';
import { url } from 'inspector';


function Navbar({ profile,setUserHis,ip}: any) {
    const navigate = useNavigate();
    const clientId = "34799196571-duahakscjfrf7441706a5vubai5097ot.apps.googleusercontent.com"//ดึง api google
    const [img,setimg] =useState("i");

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<any>(null);
    const apiKey = 'AIzaSyCNOHGqoNsdxWiNIN5ey0gidtomQ1feeOg'

    useEffect(() => {
        if (profile !== null) {
            const me = profile.googleId

            const initClient = () => {
                console.log("init");

                gapi.client.init({
                    apiKey: apiKey,
                    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                }).then(() => {
                    return gapi.client.people.people.get({
                        'resourceName': 'people/' + me,
                        'personFields': 'ageRanges,birthdays,genders,phoneNumbers',
                    }).then((response: any) => {
                        console.log(response.result)
                        saveObj(response.result);
                    })
                })

            };

            // return()=>{
            gapi.load("client:auth2", initClient);
            // }
            // gapi.load("client", getData)
        } else { navigate('/Login') }
    }, [])

    const saveObj = (res: any) => {
        const birthday=res.birthdays[0].date
        const gender=res.genders[0].value
        if(birthday.month.length==1){birthday.month="0"+birthday.month;}
        fetch(ip + ':8000/api/user/login', {
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            redirect: 'follow',
            body: JSON.stringify({
                "firstName": profile.familyName,
                "lastName": profile.givenName,
                "email":profile.email ,
                "image": profile.imageUrl,
                "birthdays": birthday.year+"-"+birthday.month+"-"+birthday.day,
                "gender": gender
            })
        })
        .then(rep=>rep.json())
        .then(res=>{getimg(res)})
        .catch(err=>{console.log(err)})

    }
    const logOut = () => {
        // setProfile(null);
        localStorage.removeItem('token')
        navigate('/Login')
    };
    const getProfile = () => {
        navigate('/Login')
    }
    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    // Effect to handle click outside the menu
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const onHistory = () => {
        fetch(ip+':8000/api/get/all/user/history?email='+profile.email)
            .then(rep=>rep.json())
            .then(res=>userHisSet(res));
        navigate('/History')
    }

    const userHisSet=(res:any)=>{
        if(res.length>0){
            console.log(res)
        setUserHis(res)}
    }
    const getimg=((res:any)=>{
        if(res.description!==null){
            if(res.description === "Bull"){setimg('images/Cow.jpg')}
            if(res.description === "Rat"){setimg('images/Rat.jpg')}
            if(res.description === "Bear"){setimg('images/Bear.jpg')}
            if(res.description === "Falcon"){setimg('images/Falcon.jpg')}
    }
    
    })

    return (
        <div>
            <div className='container' style={{zIndex:'9999'}} >
                {profile ? (

                    <div className='box' >
                        <div className='box-images'>
                            <img className='img-pro' src={profile.imageUrl} alt='user image'
                                onClick={toggleMenu}
                            />
                            {profile.name}
                        </div>
                        <div ref={menuRef} className={`hidden-menu ${showMenu ? 'show' : 'hide'}`}>
                            <div className="card" style={{ backgroundImage: `url(images/Falcon.jpg)` } }>
                                
</div>
                                <div className='card-info'>
                                    <center>
                                        <img className='img-pro1' src={profile.imageUrl} alt='user image' />
                                    </center>

                                    <center>
                                        <p> <strong>{profile.name}</strong></p>
                                        <a style={{ paddingTop: '1rem' }}>
                                            {profile.email}
                                        </a>
                                        <br />
                                        <br />
                                        <br />
                                        <button  className='btn-his' onClick={onHistory} >History</button>
                                        
                                    </center>
                                </div>
                                <div className="card1" >
                                
                                        </div>
                            
                            <br />
                            <br />
                            <div >
                                <GoogleLogout
                                    clientId={clientId}
                                    onLogoutSuccess={logOut}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick}
                                            className='btn-logout'>
                                            <img className='logo' src="imagesLogo/Logout.png" />
                                            Logout
                                        </button>
                                    )}
                                />

                            </div>
                        </div>

                    </div>

                ) : (
                    <>
                        {getProfile()}
                    </>
                )}

                <div style={{ height: '50px', marginLeft: 'auto', position: 'relative' }}>
                    <img style={{
                        width: '40px', height: '35px', marginLeft: 'top', position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        textAlign: 'center'
                    }} src="/imagesLogo/ArtboardPT.png" alt="" />
                </div>  <div style={{ textAlign: 'center' }}> <b className='n1'>New  </b>  <b>Work </b> <br />

                    <div className='tr'>Academy </div>
                </div>

            </div>


        </div>
    )
}

export default Navbar
