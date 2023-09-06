import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

export const Dashboard = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            ]);
        };

        loadModels();
    }, []);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;

        // Process frames
        setInterval(processFrame, 1000); // Process every 1 second
    };

    const processFrame = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
            const capturedFaceImage = videoRef.current;
            const faceCanvas = document.createElement('canvas');
            faceCanvas.width = capturedFaceImage.width;
            faceCanvas.height = capturedFaceImage.height;
            const faceCanvasContext = faceCanvas.getContext('2d');
            faceCanvasContext.drawImage(capturedFaceImage, 0, 0);

            const faceDescriptors = await faceapi.detectSingleFace(faceCanvas).withFaceLandmarks().withFaceDescriptor();
            
            if (faceDescriptors) {
                const serializedDescriptor = faceDescriptors.descriptor.join(',');

                // Send the serializedDescriptor to the backend for matching
                const response = await axios.post('/match-face', { descriptor: serializedDescriptor });
                console.log(response.data);
            }
        }
    };

    return (
        <div>
            <h1>Face Recognition Dashboard</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ transform: 'scaleX(-1)' }}
            />
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <button onClick={startCamera}>Start Camera</button>
        </div>
    );
};
