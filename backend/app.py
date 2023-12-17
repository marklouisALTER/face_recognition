from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS, cross_origin
import mysql.connector
import cv2
import dlib
import face_recognition
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

predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


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


@app.route('/updateemployee/<int:employee_id>', methods=['PUT'])
def updateemployee(employee_id):
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

@app.route('/updateattendance/<int:attendance_id>', methods=['PUT'])
def updateattendance(attendance_id):
    full_name = request.form.get('full_name')
    date = request.form.get('date')
    time_in = request.form.get('time_in')
    time_out = request.form.get('time_out')


    cursor = db.cursor()

    try:
        cursor.execute("SELECT COUNT(*) FROM tbl_attendrec WHERE attendance_id = %s", (attendance_id,))
        if cursor.fetchone()[0] == 0:
            return jsonify({"message": "Employee not found"}), 404

        update_query = "UPDATE tbl_attendrec SET full_name = %s, date = %s WHERE attendance_id = %s"

        cursor.execute(update_query, (full_name, date,attendance_id))
        db.commit()

        cursor.close()

        return jsonify({"message": "Attendance record updated successfully"})
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


@app.route('/attendance_record/<int:attendance_id>', methods=['DELETE'])
def deleteRecord(attendance_id):
    cursor = db.cursor()

    try:
        delete_query = "DELETE FROM tbl_attendrec WHERE attendance_id = %s"
        cursor.execute(delete_query, (attendance_id,))
        db.commit()
        cursor.close()

        return jsonify({"message": f"Record with ID {attendance_id} deleted successfully"})
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

def load_known_faces():
    cursor = db.cursor()
    cursor.execute("SELECT last_name, face_image FROM tbl_empdata")

    known_faces = []
    known_names = []

    for last_name, face_blob in cursor:
        # Convert the binary face_blob to a numpy array
        face_image = np.frombuffer(face_blob, dtype=np.uint8)

        # Decode the image
        face_image = cv2.imdecode(face_image, cv2.IMREAD_COLOR)

        # Use the pre-trained face detector from dlib
        detector = dlib.get_frontal_face_detector()
        faces = detector(cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY))

        if faces:
            # Use the first detected face for encoding
            landmarks = predictor(cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY), faces[0])
            encoding = face_recognition.face_encodings(face_image, [(
                faces[0].top(),
                faces[0].right(),
                faces[0].bottom(),
                faces[0].left()
            )])[0]
            known_faces.append(encoding)
            known_names.append(last_name)

    cursor.close()
    return known_faces, known_names

def connect_dots(image, landmarks, dot_indices, color):
    for i in range(len(dot_indices) - 1):
        start_point = (landmarks.part(dot_indices[i]).x, landmarks.part(dot_indices[i]).y)
        end_point = (landmarks.part(dot_indices[i + 1]).x, landmarks.part(dot_indices[i + 1]).y)
        cv2.line(image, start_point, end_point, color, 1)

def recognize_faces(image_path):
    # Load known faces from the database
    known_faces, known_names = load_known_faces()

    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Use the pre-trained face detector from dlib
    detector = dlib.get_frontal_face_detector()
    faces = detector(gray)

    result = {'match': False}

    for face in faces:
        landmarks = predictor(gray, face)

        # Draw bounding box around the face
        x, y, w, h = face.left(), face.top(), face.width(), face.height()
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Draw small dots for facial landmarks
        for i in range(68):
            x, y = landmarks.part(i).x, landmarks.part(i).y
            cv2.circle(image, (x, y), 1, (0, 255, 0), -1)

        # Connect dots with lines
        connect_dots(image, landmarks, [17, 18, 19, 20, 21], (0, 255, 0))  # Connect left eyebrow
        connect_dots(image, landmarks, [22, 23, 24, 25, 26], (0, 255, 0))  # Connect right eyebrow
        connect_dots(image, landmarks, list(range(36, 42)), (0, 0, 255))  # Connect left eye
        connect_dots(image, landmarks, list(range(42, 48)), (0, 0, 255))  # Connect right eye
        connect_dots(image, landmarks, list(range(29, 36)), (255, 0, 0))  # Connect nose
        connect_dots(image, landmarks, list(range(48, 68)), (0, 255, 255))  # Connect mouth

        # Extract the face encoding for recognition
        unknown_encoding = face_recognition.face_encodings(image, [(face.top(), face.right(), face.bottom(), face.left())])[0]

        # Compare with known faces
        results = face_recognition.compare_faces(known_faces, unknown_encoding)

        for i, result in enumerate(results):
            if result:
                matched_name = known_names[i]
                result = {'match': True, 'last_name': matched_name}

                # Display accuracy for individual facial features
                feature_accuracies = []

                # Nose accuracy
                nose_landmarks = list(range(29, 36))
                nose_distances = face_recognition.face_distance([known_faces[i][nose_landmarks]], unknown_encoding[nose_landmarks])
                feature_accuracies.append((1 - nose_distances[0]) * 100)

                # Left eye accuracy
                left_eye_landmarks = list(range(36, 42))
                left_eye_distances = face_recognition.face_distance([known_faces[i][left_eye_landmarks]], unknown_encoding[left_eye_landmarks])
                feature_accuracies.append((1 - left_eye_distances[0]) * 100)

                # Right eye accuracy
                right_eye_landmarks = list(range(42, 48))
                right_eye_distances = face_recognition.face_distance([known_faces[i][right_eye_landmarks]], unknown_encoding[right_eye_landmarks])
                feature_accuracies.append((1 - right_eye_distances[0]) * 100)

                # Left eyebrow accuracy
                left_eyebrow_landmarks = [17, 18, 19, 20, 21]
                left_eyebrow_distances = face_recognition.face_distance([known_faces[i][left_eyebrow_landmarks]], unknown_encoding[left_eyebrow_landmarks])
                feature_accuracies.append((1 - left_eyebrow_distances[0]) * 100)

                # Right eyebrow accuracy
                right_eyebrow_landmarks = [22, 23, 24, 25, 26]
                right_eyebrow_distances = face_recognition.face_distance([known_faces[i][right_eyebrow_landmarks]], unknown_encoding[right_eyebrow_landmarks])
                feature_accuracies.append((1 - right_eyebrow_distances[0]) * 100)

                # Mouth accuracy
                mouth_landmarks = list(range(48, 68))
                mouth_distances = face_recognition.face_distance([known_faces[i][mouth_landmarks]], unknown_encoding[mouth_landmarks])
                feature_accuracies.append((1 - mouth_distances[0]) * 100)

                # Add accuracy for each feature to the result
                result.update({
                    'feature_accuracies': {
                        'Nose': round( (1 - nose_distances[0]) * 100, 2),
                        'Left Eye': round((1 - left_eye_distances[0]) * 100, 2),
                        'Right Eye': round((1 - right_eye_distances[0]) * 100, 2),
                        'Left Eyebrow': round((1 - left_eyebrow_distances[0]) * 100, 2),
                        'Right Eyebrow': round((1 - right_eyebrow_distances[0]) * 100, 2),
                        'Mouth': round((1 - mouth_distances[0]) * 100, 2),
                    }
                })

                return result

    # If no match is found
    return result

@app.route('/detect_faces', methods=['POST'])
def detect_faces_endpoint():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    temp_image_path = './temp/temp_image.jpg'
    file.save(temp_image_path)

    # Call the recognize_faces function
    result = recognize_faces(temp_image_path)

    # Add the 'detected_features.jpg' file path to the result
    result['image_path'] = '/temp/detected_features.jpg'

    # Draw facial landmarks on the image
    image = cv2.imread(temp_image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    detector = dlib.get_frontal_face_detector()
    faces = detector(gray)

    for face in faces:
        landmarks = predictor(gray, face)

        # Draw bounding box around the face
        x, y, w, h = face.left(), face.top(), face.width(), face.height()
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Draw small dots for facial landmarks
        for i in range(68):
            x, y = landmarks.part(i).x, landmarks.part(i).y
            cv2.circle(image, (x, y), 1, (0, 255, 0), -1)

        # Connect dots with lines
        connect_dots(image, landmarks, [17, 18, 19, 20, 21], (0, 255, 0))  # Connect left eyebrow
        connect_dots(image, landmarks, [22, 23, 24, 25, 26], (0, 255, 0))  # Connect right eyebrow
        connect_dots(image, landmarks, list(range(36, 42)), (0, 0, 255))  # Connect left eye
        connect_dots(image, landmarks, list(range(42, 48)), (0, 0, 255))  # Connect right eye
        connect_dots(image, landmarks, list(range(29, 36)), (255, 0, 0))  # Connect nose
        connect_dots(image, landmarks, list(range(48, 68)), (0, 255, 255))  # Connect mouth

    cv2.imwrite('./temp/detected_features.jpg', image)
    # Calculate overall accuracy as the average of individual accuracies
    overall_accuracy = sum(result['feature_accuracies'].values()) / len(result['feature_accuracies'])
    result['overall_accuracy'] = round(overall_accuracy, 2)
    # Return the result as JSON
    return jsonify(result)


if __name__ == '__main__':
    app.run(host="localhost", port=5000)
    