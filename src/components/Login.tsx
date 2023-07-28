import { useState, useEffect } from 'react'
import './style/Login.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'



function Login() {
    const Navigate = useNavigate()

    const clientId = "569867947471-3u50fsvra6alk7ohbncjv43gejvqtm6t.apps.googleusercontent.com"

    const [profile, setprofile] = useState<any>(null)

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clienId: clientId,
                scope: ''
            })
        }
        gapi.load("client:auth2", initClient)
    }, [])



    const onSucces = (res: any) => {
        setprofile(res.profileObj)
        console.log('succes', res)
        // e.preventDefault()
      
        setprofile((value:any) => {
        localStorage.setItem('Users', res.tokenId);
        Navigate('/Users')
      
      })

    }

    const onError = (res: any) => {
        console.log('failure', res)
    }

    // const logOut = () => {
    //     setprofile(null);
    //     Navigate("/")
    // }


    return (
        <body>

            <Container className='container1'>
                <h2>What to the check out this file? Sign up or Login</h2>
                <br />
                <br />
                {/* {profile ? (
                    <div>
                        <img src={profile.imageUrl} alt="User image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <br /><br />
                        <GoogleLogout
                            clientId={clientId}
                            buttonText='Login out'
                            onLogoutSuccess={logOut}
                        />
                    </div>
                ) : ( */} 
                    <GoogleLogin 
                        clientId={clientId}
                        buttonText='Sign in with Google'
                        onSuccess={onSucces}
                        onFailure={onError}
                        cookiePolicy='single_host_origin'
                        isSignedIn={true}
                    />
             
                  
                {/* )} */}
            </Container>

        </body>
    )
} export default Login