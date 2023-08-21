import React, { useState } from 'react'
import BasicTabs from './Tabs';


function Modal({images,profile,ip,resultData}:any) {
    const [modal, setModal] = useState(false);
    const [buttonText, setButtonText] = useState('Open');
    const toggleModal = () => {
        setModal(!modal)
        setButtonText(buttonText === 'close' ? 'Open' : 'close');


        
    }
    return (
        <div>
            {modal && (
                <div>
                    <div className='modal1' >
                        <div className='overlay'></div>
                        <div className='modal-content'>

                            
                                 <BasicTabs images={images} profile={profile} ip={ip} resultData={resultData} toggleModal={toggleModal}/>







                                {/* <div style={{ paddingBottom: '3rem' }} >
                                    <button
                                        onClick={toggleModal}
                                        className='btn-close'>Close</button>

                                    <button className='btn-next' onClick={() => {

                                    }}>  Next
                                    </button>
                                    


                                </div> */}



                        </div>

                    </div>

                </div>
            )}
            <div style={{ paddingTop: "3rem" }} >

                <button
                    onClick={toggleModal}
                    className='btn-Open'>{buttonText}</button>

            </div>
        </div>              
    )
}

export default Modal
