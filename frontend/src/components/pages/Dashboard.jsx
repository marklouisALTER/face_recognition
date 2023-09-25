import React, { useRef, useEffect,useState } from 'react';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';
import { useAuth } from '../Authentication/useAuth'
import { useNavigate } from 'react-router-dom';
import { Leftbar } from '../layout/Leftbar';
import { Header } from '../layout/Header';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import face_logo from '../../assets/face_logo.png';
import { Notification } from '../Notification/Notification';
import { FaClipboardList } from 'react-icons/fa'
import { BiSolidUserPlus } from 'react-icons/bi'
import { MobileNotif } from '../Notification/MobileNotif';
export const Dashboard = ({title, leftbar,setLeftbar}) => {

    // const videoRef = useRef(null);
    // const canvasRef = useRef(null);

    const {isAuthenticated, getUser, logout} = useAuth(); // importing authentication
    const navigate = useNavigate();    // routing
    const [user] = useState(getUser()); // getting user info in session
    const [isNotification, setIsNotification] = useState(false); // notification in bigger size
    const [isMobileNotif, setIsMobileNotif] = useState(false); // notification in smaller size

    useEffect(() => {

        if(!isAuthenticated()){
          navigate('/login');
        }
    
        document.title = title;
    
      },[isAuthenticated, title])


    // useEffect(() => {

    //     const loadModels = async () => {
    //         await Promise.all([
    //             faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    //             faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //             faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    //         ]);
    //     };

    //     loadModels();
    // }, []);

    // const startCamera = async () => {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    //     videoRef.current.srcObject = stream;

    //     // Process frames
    //     setInterval(processFrame, 1000); // Process every 1 second
    // };

    // const processFrame = async () => {
    //     if (videoRef.current && videoRef.current.readyState === 4) {
    //         const capturedFaceImage = videoRef.current;
    //         const faceCanvas = document.createElement('canvas');
    //         faceCanvas.width = capturedFaceImage.width;
    //         faceCanvas.height = capturedFaceImage.height;
    //         const faceCanvasContext = faceCanvas.getContext('2d');
    //         faceCanvasContext.drawImage(capturedFaceImage, 0, 0);

    //         const faceDescriptors = await faceapi.detectSingleFace(faceCanvas).withFaceLandmarks().withFaceDescriptor();
            
    //         if (faceDescriptors) {
    //             const serializedDescriptor = faceDescriptors.descriptor.join(',');

    //             // Send the serializedDescriptor to the backend for matching
    //             const response = await axios.post('/match-face', { descriptor: serializedDescriptor });
    //             console.log(response.data);
    //         }
    //     }
    // };

    return (
        // <div className='border border-black mx-[5rem]'>
        //     <h1>Face Recognition Dashboard</h1>
        //     <video
        //         ref={videoRef}
        //         autoPlay
        //         playsInline
        //         style={{ transform: 'scaleX(-1)' }}
        //     />
        //     <canvas
        //         ref={canvasRef}
        //         style={{ position: 'absolute', top: 0, left: 0 }}
        //     />
        //     <div className='border border-black h-[10rem] flex gap-[10px]'>
        //         <img 
        //             src={"https://th.bing.com/th/id/OIP.enHnJ33r9erP04V1MdL9iwHaE7?pid=ImgDet&rs=1"} 
        //             alt="My image" />

                
        //         <button className='bg-blue-900 text-white' onClick={startCamera}>Start Camera</button>
        //     </div>
        // </div>
        <div className='w-screen h-screen flex'>
        <div>
            <Leftbar leftbar={leftbar}/>
        </div>
        <div className='w-full h-full'>
            <Header 
                user={user} 
                openNotif={() => setIsNotification(prevState => !prevState)} 
                logout={logout} 
                leftbar={() => setLeftbar(prevState => !prevState)}
                notifMobile ={() => setIsMobileNotif(prevState => !prevState)}
            />

            <div className='h-[85%] overflow-y-hidden'>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='h-full grid grid-cols-3 gap-5 px-5'>
                    <div className='grid grid-rows-4 gap-5 col-span-3 lg:col-span-2'>
                        <div className='row-span-1 p-3 rounded-md bg-optional shadow-md shadow-spread shadow-gray-300'>
                            <div className='flex flex-col items-center justify-between md:flex-row'>
                                <h1 className='font-optional font-bold text-primary text-2xl'>Good Morning, Markme19</h1>
                                <h1 className='font-optional text-primary font-semibold'>Date today: 
                                    <span className='font-normal italic text-black'> September 18, 2023</span>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-optional text-gray-500 italic mt-3'>Shortcut Access</h1>
                                <div className='hidden sm:flex gap-5 px-5 mt-2 '>
                                    <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2'>
                                        <FaClipboardList />
                                        View Attendance Record
                                    </button>
                                    <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2'>
                                        <BiSolidUserPlus className='text-xl'/>
                                        Create New Employee
                                    </button>
                                </div>

                                {/* Mobile view xs size */}
                                <div className='flex sm:hidden'>
                                <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2 mx-auto'>
                                        <BiSolidUserPlus className='text-xl'/>
                                        Shortcut Access
                                </button>
                                </div>
                            </div>
                        </div>
                        <div 
                            className='row-span-3 flex-col rounded-md bg-optional shadow-md
                            shadow-spread shadow-gray-300 p-5'>

                                <div className='flex flex-col items-center justify-between md:flex-row'>
                                    <h1 className='font-primary text-xl'>Click open to start</h1>
                                    <button
                                        className='bg-primary px-5 py-2 rounded-md font-secondary text-white
                                        hover:bg-onMouse focus:outline-none focus:ring ring-primary'>
                                        Open the camera
                                    </button>
                                </div>
                                
                                <div className=' flex items-center justify-center mt-10'>
                                <img 
                                    src={face_logo} 
                                    alt="Dummy logo"
                                    className='object-cover w-[35%]'
                                    />
                                </div>
                        </div>
                    </div>
                    <div className='hidden lg:block rounded-md overflow-y-auto'>
                    <div className='bg-primary p-2 rounded-md'>
                        <h1 className='text-white font-secondary text-xl text-center'>Future Plans / Sticky Notes</h1>
                    </div>
                        <Notification 
                            openNotif={() => setIsNotification(prevState => !prevState)} 
                            notification={isNotification}
                        />
                    </div>
                </div>

            </div>
        </div>
        {isMobileNotif ? <MobileNotif openNotif={() => setIsMobileNotif(prevState => !prevState )}/> : '' }
        
    </div>
    );
};
