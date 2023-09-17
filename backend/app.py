from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import cv2
import numpy as np
import json
import os
import wget
import jwt
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)

# MySQL Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="face_recognition"
)


# def generate_face_descriptor(face_image):
#     # Load pre-trained OpenCV model for face recognition (e.g., deep neural networks)
#     face_recognizer = cv2.dnn.readNetFromTorch('path_to_model.t7')

#     # Preprocess the face image
#     blob = cv2.dnn.blobFromImage(
#         face_image, 1.0, (224, 224), (104, 117, 123), swapRB=True, crop=False)
#     face_recognizer.setInput(blob)

#     # Generate face descriptors
#     face_descriptor = face_recognizer.forward()

#     return face_descriptor


@app.route('/')
def test_db_connection():
    cursor = db.cursor()
    cursor.execute("SELECT 1")
    result = cursor.fetchone()
    cursor.close()
    return jsonify({"message": f"Database Connection Successful: {result[0]}"})


@app.route('/login', methods=['POST'])
def login():
    # Assuming the frontend sends JSON data with username and password
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cursor = db.cursor()

    query = "SELECT * FROM tbl_login WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    cursor.close()

    if user:
        # Include user information in the response JSON
        user_data = {
            "user_id": user[0],  # Modify this to match your database schema
            "username": user[1],  # Modify this to match your database schema
            # Add more user-related data here
        }

        # Create a JWT token
        token_payload = {
            "user_id": user_data["user_id"],
            "username": user_data["username"],
            "exp": datetime.utcnow() + timedelta(hours=1)  # Token expiration time (adjust as needed)
        }

        # Your secret key for signing the token (keep this secret)
        secret_key = "your_secret_key_here"

        token = jwt.encode(token_payload, secret_key, algorithm="HS256")

        return jsonify({"message": "Login successful", "user_data": user_data, "token": token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# @app.route('/match-face', methods=['POST'])
# def match_face():
#     # Assuming the frontend sends a serialized face descriptor
#     data = request.get_json()
#     serialized_descriptor = data.get('descriptor')

#     # Convert serialized_descriptor to a usable format (e.g., list or numpy array)
#     descriptor_array = [float(value)
#                         for value in serialized_descriptor.split(',')]

#     # Perform matching logic using the generated face descriptor
#     # Compare descriptor_array with stored descriptors in the database

#     # Replace this with your actual matching logic
#     return jsonify({"message": "Face matching result here"})

# # Add a new route for training models


# @app.route('/train-models', methods=['POST'])
# def train_models():
#     data = request.get_json()

#     labeled_face_descriptors = []

#     for entry in data:
#         image_path = entry['image_path']
#         username = entry['username']

#         image = cv2.imread(image_path)
#         face_descriptor = generate_face_descriptor(image)

#         labeled_face_descriptors.append({
#             'label': username,
#             'descriptor': face_descriptor.tolist()
#         })

#     # Create a face matcher
#     face_matcher = {
#         'labeled_face_descriptors': labeled_face_descriptors
#     }

#     # Serialize the face matcher
#     serialized_face_matcher = json.dumps(face_matcher)

#     # Save serialized_face_matcher to your database or file system

#     return jsonify({"message": "Models trained and serialized"})


# model_url = "https://storage.cmusatyalab.org/openface-models/nn4.small2.v1.t7"
# model_filename = "nn4.small2.v1.t7"
# model_path = os.path.join("pre_train_models", model_filename)

# if not os.path.exists(model_path):
#     print("Downloading OpenFace model...")
#     wget.download(model_url, model_path)

# # Load the OpenFace model
# face_recognizer = cv2.dnn.readNetFromTorch(model_path)

# # The rest of your code...

if __name__ == '__main__':
    app.run(debug=True)
