from fastapi import FastAPI, HTTPException, Depends
from flask import Flask, request, jsonify
from typing import List
import pymysql.cursors
from .query import execute_sql_query
import os

app = Flask(__name__)
UPLOAD_FOLDER = './uploadfolder'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        if file:
            # 파일을 서버에 저장
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            # 데이터베이스에 파일 경로 저장
            save_file_path_to_db(file.filename, file_path)

            return jsonify({'message': 'File uploaded successfully'})

    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'})
    
def save_file_path_to_db(file_name, file_path):
    try:
        

            # 파일을 데이터베이스에 삽입
        execute_sql_query('INSERT INTO board (file_name, file_path) VALUES (%s, %s)', (file_name, file_path))

        print("File path saved to database successfully.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    app.run(debug=True)