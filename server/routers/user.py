from fastapi import APIRouter, Response, Depends, Header
from pydantic import BaseModel
from typing import Annotated
from ..database.query import execute_sql_query
from ..controllers.session import createSession, getSessionData
from datetime import datetime

router = APIRouter(prefix="/api")

@router.get('/checkId')
async def checkEmail(id: str):
    try:
        res = await execute_sql_query(
            "SELECT * FROM user WHERE id = %s", (id,))
        if len(res) != 0:
            return 401, "중복된 아이디가 있습니다."
        else:
            return 200, {"message": "중복된 아이디가 없습니다."}
    except Exception as e:
        return 500, "서버 오류"

# 닉네임 중복 확인


@router.get('/checkNickname')
async def checkNickname(nickname: str):
    try:
        res = await execute_sql_query(
            "SELECT * FROM user WHERE nickname = %s", (nickname,))
        if len(res) != 0:
            return 401, "중복된 닉네임이 있습니다."
        else:
            return 200, {"message": "중복된 닉네임이 없습니다."}
    except Exception as e:
        return 500, "서버 오류"
    
@router.get('/checkEmail')
async def checkEmail(email: str):
    try:
        res = await execute_sql_query(
            "SELECT * FROM user WHERE email = %s", (email,))
        if len(res) != 0:
            return 401, "중복된 email이 있습니다."
        else:
            return 200, {"message": "중복된 email이 없습니다."}
    except Exception as e:
        return 500, "서버 오류"
    
class Signup(BaseModel):
    id:str
    password:str
    nickname:str
    email:str

@router.post('/signup')
async def signup(data:Signup):
    try:
        id = await execute_sql_query(
            "SELECT * FROM user WHERE id = %s", (data.id,)
        )
        email = await execute_sql_query(
            "SELECT * FROM user WHERE email = %s", (data.email,)
        )
        if len(id) != 0:
            return 401, "중복된 아이디가 있습니다."
        if len(email) != 0:
            return 401, "중복된 email이 있습니다."
        
    except Exception as e:
        print(e)
        return 500, "서버오류" 
    
@router.get('/checkSession')
async def checkSession(session: Annotated[str, Header()] = None):
    try:
        session_data = await getSessionData(session)
        if not session_data:
            return False
        return session_data
    except Exception as e:
        return 500, "서버 오류"