from fastapi import APIRouter, Cookie, Header
from typing import Annotated
from pydantic import BaseModel
from typing import Optional
from ..database.query import execute_sql_query
from ..controllers.session import getSessionData
from datetime import datetime

class AddBoard(BaseModel):
    title : str
    content : str
    type : str
    fileName : str
    filePath : str

class modifyBoard(BaseModel):
    id: int
    title: str
    content: str
    fileName : str
    filePath : str


router = APIRouter(prefix="/api")

@router.post("/postBoard")
async def addBoard(data: AddBoard, session: Annotated[str, Header()] = None):
    
    # print(data.title, data.content, data.session)
    #info = await getSessionData(session)
    # print(info.idx)
    today = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # print(today)
    # 게시글 추가 로직 board 테이블에 게시글을 추가한다.
    res = await execute_sql_query("INSERT INTO board (title, content, createdAt, viewCount, filiName, filePath, type) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
                                                                            (data.title, data.content, today, data.fileName, data.filePath, 0, data.type,))
    # 게시글 마지막 idx 조회
    res = await execute_sql_query("SELECT MAX(id) AS id FROM board")

    # print(res)
    return 200, {'message': res[0]['id']}

@router.get("/boards")
async def getBoards(category:str, sortType:str, power:int):
    return