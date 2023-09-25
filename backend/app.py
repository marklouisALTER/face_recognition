from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
import cv2
import numpy as np
import json
import os
import wget
import jwt
from datetime import datetime, timedelta
import base64

app = Flask(__name__)
CORS(app, supports_credentials=True)

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
        user_data = {
            "user_id": user[0],  
            "username": user[1],  

        }

        token_payload = {
            "user_id": user_data["user_id"],
            "username": user_data["username"],
            "access_type": "Bearer",  
            "exp": datetime.utcnow() + timedelta(hours=1)
        }

        secret_key = "your_secret_key_here"

        token = jwt.encode(token_payload, secret_key, algorithm="HS256")


        token = "Bearer " + token

        return jsonify({"message": "Login successful", "user_data": user_data, "token": token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@app.route('/updateemployee/<int:employee_id>', methods=['PATCH'])
def update_employee(employee_id):
    
    if request.method == 'PATCH':
        firstname = request.form.get('first_name')
        lastname = request.form.get('last_name')
        imageupload = request.files.get('file')

        cursor = db.cursor()

        try:
            cursor.execute("SELECT COUNT(*) FROM tbl_empdata WHERE employee_id = %s", (employee_id,))
            if cursor.fetchone()[0] == 0:
                return jsonify({"message": "Employee not found"}), 404

            update_query = "UPDATE tbl_empdata SET first_name = %s, last_name = %s, face_image = %s WHERE employee_id = %s"
            image_data = imageupload.read()

            cursor.execute(update_query, (firstname, lastname, image_data, employee_id))
            db.commit()

            cursor.close()

            return jsonify({"message": "Employee data and image updated successfully"})
        except Exception as e:
            db.rollback()
            cursor.close()
            return jsonify({"message": "Error updating data: " + str(e)}), 500
        

@app.route('/employeedata', methods=['POST'])
def employeeData():
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    imageupload = request.files.get('file')

    cursor = db.cursor()

    try:

        insert_query = "INSERT INTO tbl_empdata (first_name, last_name, face_image) VALUES (%s, %s, %s)"
        image_data = imageupload.read()
        
        cursor.execute(insert_query, (firstname, lastname, image_data))
        db.commit()  
        
        cursor.close()

        return jsonify({"message": "Employee data and image inserted successfully"})
    except Exception as e:
        db.rollback()  
        cursor.close()
        return jsonify({"message": "Error inserting data: " + str(e)}), 500



@app.route('/employeedata/<int:employee_id>', methods=['DELETE'])
def deleteEmployee(employee_id):
    cursor = db.cursor()

    try:
        delete_query = "DELETE FROM tbl_empdata WHERE employee_id = %s"
        cursor.execute(delete_query, (employee_id,))
        db.commit()
        cursor.close()

        return jsonify({"message": f"Employee with ID {employee_id} deleted successfully"})
    except Exception as e:
        db.rollback()
        cursor.close()
        return jsonify({"message": "Error deleting data: " + str(e)}), 500




@app.route('/all_employees', methods=['GET'])
def get_usernames():
    cursor = db.cursor()
    try:
        query = "SELECT first_name, employee_id FROM tbl_empdata"
        cursor.execute(query)
        result = cursor.fetchall()
        data = [{"first_name": row[0], "employee_id": row[1]} for row in result]
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"message": "Error fetching data: " + str(e)}), 500
    finally:
        cursor.close()


@app.route('/fetch_all_employees', methods=['GET'])
def get_all_employees():
    cursor = db.cursor()
    try:
        query = "SELECT * FROM tbl_empdata"
        cursor.execute(query)
        result = cursor.fetchall()

        # Convert binary data (e.g., face_image) to Base64
        data = []
        for row in result:
            employee_id, first_name, last_name, face_image_blob = row
            face_image_base64 = base64.b64encode(face_image_blob).decode('utf-8')
            data.append({
                "employee_id": employee_id,
                "first_name": first_name,
                "last_name": last_name,
                "face_image": face_image_base64
            })
        
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"message": "Error Fetching data: " + str(e)}), 500
    finally:
        cursor.close()


@app.route('/view_all_attendance', methods=['GET'])
def view_all_attendance():
    cursor = db.cursor()
    try:
        query = "SELECT attendance_id, employee_id, full_name, date, time_in, time_out FROM tbl_attendrec"
        cursor.execute(query)
        result = cursor.fetchall()
        # Convert the result to a list of dictionaries for easier JSON serialization
        attendance_data = []
        for row in result:
            attendance_data.append({
                'attendance_id': row[0],
                'employee_id': row[1],
                'full_name': row[2],
                'date': row[3],
                'time_in': row[4],
                'time_out': row[5]
            })
        return jsonify({'attendance_data': attendance_data})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        cursor.close()




if __name__ == '__main__':
    app.run(debug=True)
    
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