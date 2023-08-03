import { useState, useEffect } from 'react'
import './style/Users.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Container } from '@mui/material'
import { Navigate, Route, Routes, useFetcher, useNavigate } from 'react-router-dom'

function Users() {
    const navigate = useNavigate();
    const clientId = "569867947471-3u50fsvra6alk7ohbncjv43gejvqtm6t.apps.googleusercontent.com"
    const [profile, setProfile] = useState<any>(null);
    // const [data, setData] = useState<any>(null);
    const [images, setImages] = useState<any>(null);
    const [modal, setModal] = useState(false);

    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
    // const ip = 'http://192.168.1.20'
    // Get the navigate function from the hook
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
        localStorage.removeItem('token')
        navigate('/Login')

    };
    // var requestOptions = {
    //     method: 'GET',
    //     // headers: {'Access-Control-Allow-Origin': '*'} 
    //     // redirect: 'follow'
    // };
    // useEffect(() => {
    //     // fetch data
    //     const dataFetch = async () => {
    //       const data = await (
    //         await fetch("http://characterapi.ticwoc.repl.co/characters")
    //       ).json();
    //       // set state when the data received
    //       setImages(data);
    //     };

    //     dataFetch();
    //   }, []);

    useEffect(() => {
        // Fetch character data from the API
        fetch('https://images-api.shouko02.repl.co/characters')
            .then((response) => response.json())
            .then((images) => {
                // Shuffle the character data before setting it in the state
                setImages(shuffleArray(images));
            });
    }, []);

    const shuffleArray = (array: []) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (images === null) {
        return <div style={{ fontSize: '50px' }}>Loading...</div>;
        // แสดงข้อความ Loading หรือสิ่งอื่นๆ ในระหว่างที่รอให้ข้อมูลโหลดเสร็จ
    }

    // console.log(images)

    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
    };




    // Function to handle character selection
    const handleCharacterSelection = (characterId: string) => {
        setSelectedCharacters((prevSelected) => {
            if (prevSelected.includes(characterId)) {
                return prevSelected.filter((id) => id !== characterId);
            } else {
                if (prevSelected.length < 10) {
                    return [...prevSelected, characterId];
                } else {
                    return prevSelected;
                }
            }
        });
    };

    const toggleModal = () => {
        setModal(!modal)
    }


    return (<nav  >


        <div className='container'   >

            <div >
                {profile ? (

                    <div className='box' >
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
                                        <img className='logo' src="images/Google.png" />
                                        Logout

                                    </button>
                                )}
                            />
                            <div>

                                <div>




                                </div>


                            </div>
                        </div>







                        {modal && (
                            <div>
                            <div className='modal' >
                                <div className='overlay'></div>
                                <div className='modal-content'>
                                    <h2>Content</h2>

                                    <div>

                                        <div className='box-choice' style={{ flexWrap: "wrap", display: 'flex', padding: "3rem " }} >

                                            {images.map((character: any) => (
                                                <div className="character-card" key={character.id}>
                                                    <div className='img-box-choice' >
                                                        <div
                                                            className={`item ${selectedCharacters.includes(character.id) ? 'checked ' : 'default'}`}
                                                        >
                                                            <img className='img-choice'
                                                                src={character.image} alt={character.name} style={{ width: '100px' }}
                                                                onClick={() => handleCharacterSelection(character.id)}
                                                            />
                                                        </div>

                                                        
                                                    </div>
                                                </div>
                                            ))}


<button
                                                            onClick={toggleModal}
                                                            className='btn-close'>Close</button>
                                        </div>
<h1>hello</h1>


                                    </div>

                                </div>

                            </div>
                            
                            </div>
                        )}





                    </div>





                ) : (
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    // scope="email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile" 
                    />
                )}
            </div>
            <div className='box-img'>?</div>



        </div>

        {/* <div className='box-choice' style={{ flexWrap:"wrap",display:'flex',padding:'5rem'}} >
            {images.map((data:any)=>(
                <div className='img-box-choice' >
                    <label >
                    <img  className="img-choice" src={data.imagePath}/>
                    <input type='checkbox'/>
                    <br/>
                    </label>
                </div>
            ))}
            <p>{images[3].imageName}</p>
        </div> */}






        {/* 
        <div>


                  <div className='box-choice' style={{ flexWrap: "wrap", display: 'flex', paddingTop:'6rem' ,padding:"3rem "}} >
     
                        {images.map((character: any) => (
                            <div className="character-card" key={character.id}>
                                <div className='img-box-choice' >
                                    <div
                                        className={`item ${selectedCharacters.includes(character.id) ? 'checked ' : 'default'}`}
                                    >
                                        <img className='img-choice'
                                            src={character.image} alt={character.name} style={{ width: '100px' }}
                                            onClick={() => handleCharacterSelection(character.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div> 


        </div> */}
        {/* <button
            onClick={toggleModal}
            className='btn-modal'>open</button>
        {modal && (
            <div className='modal' >
                <div className='overlay'></div>
                <div className='modal-content'>
                    <h2>Content</h2>
                    <div>


                    </div>
                    <button
                        onClick={toggleModal}
                        className='btn-close'>Close</button>
                </div>

            </div>
        )} */}

        <div style={{ paddingTop: "3rem" }} >
            <button

                onClick={toggleModal}
                className='btn-modal'>open</button>
        </div>

    </nav>
    );
}

export default Users
