import React, { useRef, useEffect,useState } from 'react';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';
import { useAuth } from '../Authentication/useAuth'
import { useNavigate } from 'react-router-dom';
import { Leftbar } from '../layout/Leftbar';
import { Header } from '../layout/Header';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import face_logo from '../../assets/face_logo.png';
export const Dashboard = ({title, leftbar,setLeftbar}) => {

    // const videoRef = useRef(null);
    // const canvasRef = useRef(null);
    const {isAuthenticated, getUser, logout} = useAuth();
    const navigate = useNavigate();    
    const [user] = useState(getUser());

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
            <Header user={user} logout={logout} leftbar={() => setLeftbar(prevState => !prevState)}/>
            <div className='h-[85%]'>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='h-full grid grid-cols-3 gap-5 px-5'>
                    <div className='grid grid-rows-4 gap-5 col-span-3 lg:col-span-2'>
                        <div className='row-span-1 rounded-md bg-optional shadow-md shadow-spread shadow-gray-300'>

                        </div>
                        <div 
                            className='row-span-3 flex-colrounded-md bg-optional shadow-md
                            shadow-spread shadow-gray-300 p-5'>

                                <div className='flex items-center justify-between'>
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
                    <div className='hidden lg:block border rounded-md bg-optional shadow-md shadow-spread shadow-gray-300'>
                    </div>
                </div>

            </div>
        </div>  
    </div>
    );
};
