import { useState, useEffect } from 'react'
import './style/Login.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import GoogleButton from 'react-google-button'

import { gapi } from 'gapi-script'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';





function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme. 
const defaultTheme = createTheme();

export default function Login() {





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




    const onSucces = async (res: any) => {
        setprofile(res.profileObj)
        console.log('succes', res)
        // e.preventDefault()

        setprofile(async (value: any) => {

            ///เชื่อมต่อ databaese
            const userData = {
                name: res.profileObj.name,
                email: res.profileObj.email,
            };

            const response = await axios.post('http://localhost:8080/api/gmail', userData);
            console.log('API response:', response.data);

            // localStorage.setItem('UsersId', res.tokenId);
            // localStorage.setItem('UsersObj', res.tokenObj);
            localStorage.setItem('token', res.accessToken);
            alert(userData)
            
            Navigate('/Users')

        })

    }

    const onError = (res: any) => {
        console.log('failure', res)
    }






    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (


        <ThemeProvider theme={defaultTheme}>

            <div >
                <Container component="main" maxWidth="xs">


                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <div >
                                {/* <h2>What to the check out this file? Sign up or Login</h2>
                <br />
                <br /> */}
                                <GoogleLogin
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick}
                                            className='btn-Login'
                                        >
                                            <img className='logo1' src="images/Google.png" />
                                            This is Login Google
                                        </button>
                                    )}
                                    
                                    clientId={clientId}
                                    onSuccess={onSucces}
                                    onFailure={onError}
                                    cookiePolicy='single_host_origin'
                                    isSignedIn={true}
                                />
                            </div>






                            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                                </Grid>
                                <Grid item>
                                    {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>

            </div>
        </ThemeProvider>

    );
}

























