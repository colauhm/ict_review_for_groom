from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from .query import execute_sql_query
import os
from fastapi import APIRouter

router = APIRouter(prefix="/api")
app = FastAPI()

UPLOAD_FOLDER = './uploadfolder'
app.config = {"UPLOAD_FOLDER": UPLOAD_FOLDER}  # 수정된 부분

# 디렉터리가 없는 경우 생성
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@router.post('/upload')
async def upload_file(file: UploadFile = File(..., max_length=10 * 1024 * 1024)): # 10mb제한
    try:
        # 파일을 서버에 저장
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        with open(file_path, 'wb') as f:
            f.write(file.file.read())

        # 데이터베이스에 파일 경로 저장
        save_file_path_to_db(file.filename, file_path)

        return JSONResponse(content={'message': 'File uploaded successfully'}, status_code=200)

    except Exception as e:
        return JSONResponse(content={'error': f'Error: {str(e)}'}, status_code=500)

def save_file_path_to_db(file_name, file_path):
    try:
        # 파일을 데이터베이스에 삽입
        execute_sql_query('INSERT INTO board (file_name, file_path) VALUES (%s, %s)', (file_name, file_path))

        print("File path saved to database successfully.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
