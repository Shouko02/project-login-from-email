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
    const [data, setData] = useState<any>();
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
        // setProfile(null);
        // localStorage.removeItem('UsersId')
        // localStorage.removeItem('UsersObj')
        localStorage.removeItem('token')
        navigate('/login');
    };
    var requestOptions = {
        method: 'GET',
        // redirect: 'follow'
    };

    fetch("http://192.168.1.15:8000/api/find/all/images", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    return (<nav >


        <div className='container'   >

            <div className='boxzing'>
                {profile ? (
                  
                        <div  className='box' >
                            <div className='box-images'>
                                <img className='img-pro' src={profile.imageUrl} alt='user image' />

                            </div>

                            <div className='name' >
                                <p>Name: <strong>{profile.name}</strong></p>
                                <p>Email: <strong>{profile.email}</strong></p>
                                <br />
                                <br />
                            </div>

                            <div className='btn-box'>

                               <GoogleLogout

                            clientId={clientId}
                            onLogoutSuccess={logOut}
                            render={renderProps => (
                                <button onClick={renderProps.onClick}
                                    className='btn-logout'>
                                    {/* <img className='logo' src="images/Google.png" /> */}
                                    Logout

                                </button>
                            )}
                                /> 
                                </div>
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
                )}
            </div> 
            <div className='box-img'>?</div>


        </div>
    </nav>
    );
}

export default Users
