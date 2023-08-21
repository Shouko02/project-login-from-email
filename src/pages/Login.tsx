import { useState, useEffect } from 'react'
import '../components/style/Login.css'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createMuiTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme. 
const backgroundImage = process.env.PUBLIC_URL + '/imageswallpaper/b.jpeg';
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
});
export default function Login({profile,setProfile}:any) {
    const Swal = require('sweetalert2')
    const Navigate = useNavigate()
    const clientId = "34799196571-duahakscjfrf7441706a5vubai5097ot.apps.googleusercontent.com"

    // const [profile, setProfile] = useState<any>(null);

    // useEffect(() => {
    //         const initClient = () => {
    //                 gapi.client.init({
    //                     apiKey: 'AIzaSyCNOHGqoNsdxWiNIN5ey0gidtomQ1feeOg',
    //                     clientId: clientId,
    //                     discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
    //                     scope: 'https://www.googleapis.com/auth/contacts',
    //                 })
    //         }
    //         // gapi.load("client", initClient)
    // }, [])

    const onSucces = async (res: any) => {
        setProfile(res.profileObj)

        console.log('succes', res)
      

        function isLoggedIn() {
            const token = localStorage.getItem('token');
            return !!token; // ตรวจสอบว่ามี token หรือไม่ ถ้ามีคืนค่า true ถ้าไม่มีคืนค่า false
        }
        localStorage.setItem('token', res.accessToken);
        if (isLoggedIn()) {
            // If the user is logged in, redirect to the Users page
            Navigate('/Home_page');
        } else {
            // If the user is not logged in (should not happen), redirect to the Login page
            Navigate('/Login');
        }
    // })
    }

    const onError = (res: any) => {
        console.log('failure', res);
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };


    

    return (


        <ThemeProvider theme={defaultTheme} >
            {/* <CssBaseline /> */}
            <div style={{
                backgroundImage: `url(${backgroundImage})`, width: '100%',
                height: '100vh', backgroundSize: 'cover'
            }}>
                {/* Your components and routes go here */}


                <div style={{display: 'flex' , paddingLeft: '1rem', paddingTop: '1rem'}}>
                    <div style={{ height: '50px', position: 'relative', display: 'flex' }} >
                        <img style={{
                            width: '40px', height: '35px', marginLeft: 'top', position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            textAlign: 'center'
                        }} src="/imagesLogo/ArtboardPT.png" alt="" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <b className='n1'>New  </b>  <b >Work </b> <br />
                        <div className='tr'>Academy </div>

                    </div>


                </div>


                <div className='box-body'>



                    <div className='box-container' >


                        <Container component="main" maxWidth="xs">

                            {/* <CssBaseline /> */}
                            <Box >
                                <Typography component="h1" variant="h5" sx={{ marginTop: 3, }}>
                                    Sign in With Google
                                </Typography>
                                <img src="imagesLogo/Google.png" style={{ width: '100px' }} />
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


                                    <div >
                                        <GoogleLogin
                                            render={renderProps => (
                                                <button onClick={renderProps.onClick}
                                                    className='btn-Login'
                                                >
                                                    <img className='logo1' src="" />
                                                    This is Login Google
                                                </button>
                                            )}
                                            scope='https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read'
                                            clientId={clientId}
                                            onSuccess={onSucces}
                                            onFailure={onError}
                                            cookiePolicy='single_host_origin'
                                            isSignedIn={true}
                                        />
                                    </div>
                                </Box>
                            </Box>

                        </Container>

                    </div>
                </div>
            </div>

        </ThemeProvider>

    );
}
