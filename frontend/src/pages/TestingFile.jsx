import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../../backend/temp/detected_features.jpg';
import { FaUserAlt } from "react-icons/fa";
import { Image, Progress } from 'antd';
export const TestingFile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [detectedImage, setDetectedImage] = useState(null);
    const [overallAccuracy, setOverallAccuracy] = useState(null);
    const [featureAccuracies, setFeatureAccuracies] = useState(null);
    const [lastName, setLastName] = useState();
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        setDetectedImage(null);
        setAccuracy(null);
        setFeatureAccuracies(null);
    };

    const handleDetectFaces = () => {
        const formData = new FormData();
        formData.append('file', imageFile);
    
        axios.post('http://localhost:5000/detect_faces', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            // Assuming the response.data.image_path is the binary data of the image
            const blob = new Blob([response.data.image_path], { type: 'image/jpeg' });
            setDetectedImage(URL.createObjectURL(blob));
            setOverallAccuracy(response.data.overall_accuracy);
            setFeatureAccuracies(response.data.feature_accuracies);
            setLastName(response.data.last_name);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const colorAccuracy = {
        Color : overallAccuracy < 50 ? 'red' : overallAccuracy >= 50 && overallAccuracy < 80 ? 'yellow' : 'green',
        textPrompt : overallAccuracy < 50 ? 'Bad' : overallAccuracy >= 50 && overallAccuracy < 80 ? 'Average' : 'Good'
    };

    // console.log(featureAccuracies);
    return (
        featureAccuracies ? (
            <div className='w-full h-screen grid grid-cols-1 md:grid-cols-3'>
            <div className='w-full h-full p-5'>
                <h1 className='font-primary text-2xl text-blue-700 font-bold'>Attendance Result</h1>
                <h1 className='font-secondary text-xl mt-10 font-semibold text-gray-700'>Employee Information :</h1>
                <div className='flex flex-col items-center mt-5 justify-center'>
                    <div className='p-10 border-2 bg-gray-100 rounded-xl'>
                        <Image 
                            className='w-full h-full object-cover rounded-md'
                            src={logo} 
                            alt="Detected Face" 
                        />
                    </div>
                    <div className='mt-10 w-full grid grid-cols-4 gap-1'>
                        <div className='col-span-1 bg-gray-100 border-2 rounded-tl-xl rounded-bl-xl flex items-center justify-center'>
                            <FaUserAlt className='text-3xl text-primary'/>
                        </div>
                        <div className=' col-span-3 flex flex-col bg-gray-100 p-2 border-2 rounded-tr-xl rounded-br-xl'>
                            <h1 className='font-secondary text-xl text-gray-600'>Employee Last name</h1>
                            <h1 className='text-2xl font-primary font-bold mt-1 text-primary'>{lastName ? lastName : 'No Last Name'}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-2 w-full h-full p-5 md:mt-10'>
                <h1 className='font-secondary text-xl mt-10 font-semibold text-gray-700'>Face Accuracy :</h1>
                <div className='flex flex-col items-center'>
                    <div className='mt-10 w-full grid grid-cols-2 gap-5'>
                        {/* <h1 className='font-secondary text-xl text-gray-600'>Eyebrows Accuracy Matched</h1>
                        <Progress percent={99} /> */}
                            {Object.keys(featureAccuracies).map((feature) => (
                                
                                <div className='flex flex-col bg-gray-100 p-3 border-2 rounded-xl'>
                                    <h1 className='font-secondary text-sm md:text-xl text-gray-600'>{feature}</h1>
                                    <Progress percent={featureAccuracies[feature]} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='p-5 flex flex-col md:flex-row justify-evenly'>
                        <div className='flex flex-col gap-5 items-center'>
                            <h1 className='font-secondary text-xl font-semibold text-gray-700'>Overall Accuracy</h1>
                            <div className='flex items-center gap-20 '>
                                <Progress 
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    type='dashboard' 
                                    percent={overallAccuracy} 
                                />
                                <div className='flex items-center gap-3'>
                                    <div className={`w-3 h-3 bg-${colorAccuracy.Color}-500 rounded-full`}></div>
                                    <h1 className={`text-2xl text-${colorAccuracy.Color}-500`}>{colorAccuracy.textPrompt}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-end  md:justify-end md:mt-5'>
                            {/* <h1 className='font-secondary text-xl font-semibold text-gray-700'>Button Functionality</h1> */}
                            <div className='flex mt-5 gap-5'>
                                <button className='bg-primary px-5 py-2 rounded-md text-white font-primary
                                transition-all delay-50 ease-in-out hover:bg-blue-600 focus:outline-none
                                focus:ring focus:ring-blue-300'
                                >Add to attendance
                                </button>
                                <button className='bg-primary px-5 py-2 rounded-md text-white font-primary
                                transition-all delay-50 ease-in-out hover:bg-blue-600 focus:outline-none
                                focus:ring focus:ring-blue-300'
                                >Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : 
        (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleDetectFaces}>Detect Faces</button> 
        </div>
        )
    );
};

{/* {featureAccuracies && (
    <div>
        <h3>Feature Accuracies:</h3>
        <ul>
            {Object.keys(featureAccuracies).map((feature) => (
                <li key={feature}>{`${feature}: ${featureAccuracies[feature]}%`}</li>
            ))}
        </ul>
        <img src={logo} alt="Detected Faces" />
    </div>
)}
<h1>{lastName}</h1> */}
{/* <img src={logo} alt="Detected Face" /> */}
