import { useState, useEffect } from 'react'
import './style/Users.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function Users() {
    const Navigate = useNavigate()
    const clientId = "569867947471-3u50fsvra6alk7ohbncjv43gejvqtm6t.apps.googleusercontent.com"
    const [profile, setProfile] = useState<any>(null);
    const navigate = useNavigate(); // Get the navigate function from the hook

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: '',
            });
        };
        gapi.load("client:auth2", initClient);
    }, []);

    const onSuccess = (res: any) => {
        setProfile(res.profileObj);
        console.log('success', res);
    };

    const onFailure = (res: any) => {
        console.log('failed', res);
    };

    const logOut = () => {
        setProfile(null);
        localStorage.removeItem('users')
        navigate('/login');
    };

    return (<body>
        
   
        <div className='container' >
            <header>

            </header>
            <center>
                <h2>My Profile</h2>
               <br />

                {profile ? (
                    <div >
                        <img className='img-pro' src={profile.imageUrl} alt='user image' />
                        <p>Name: <strong>{profile.name}</strong></p>
                        <p>Email: <strong>{profile.email}</strong></p>
                        <br />
                        <br />
                        <GoogleLogout 
                            clientId={clientId}
                            buttonText="Log out"
                            onLogoutSuccess={logOut}
                        />

                    </div>
                ) : (
                    <GoogleLogin 
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                ) }
            </center>
           
            
        </div> 
        {/* <button>ok</button> */}
        </body>
    );
}

export default Users
