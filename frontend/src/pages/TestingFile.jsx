import React, { useState } from 'react';
import axios from 'axios';

export const TestingFile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [detectedImage, setDetectedImage] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [featureAccuracies, setFeatureAccuracies] = useState(null);

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
            setDetectedImage(URL.createObjectURL(response.data.image_path));
            setAccuracy(response.data.overall_accuracy);
            setFeatureAccuracies(response.data.feature_accuracies);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleDetectFaces}>Detect Faces</button>
            {detectedImage && <img src={detectedImage} alt="Detected Faces" />}
            {accuracy && <p>Overall Accuracy: {accuracy.toFixed(2)}%</p>}
            {featureAccuracies && (
                <div>
                    <h3>Feature Accuracies:</h3>
                    <ul>
                        {Object.entries(featureAccuracies).map(([feature, acc]) => (
                            <li key={feature}>{feature}: {acc.toFixed(2)}%</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
