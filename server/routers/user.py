from fastapi import APIRouter, Response, Depends, Header
from pydantic import BaseModel
from typing import Annotated
from ..database.query import execute_sql_query
from ..controllers.session import createSession, getSessionData
from datetime import datetime

router = APIRouter(prefix="/api")

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
    
