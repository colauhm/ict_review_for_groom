from fastapi import APIRouter, Response, Depends, Header
from pydantic import BaseModel
from typing import Annotated
from ..database.query import execute_sql_query
from ..controllers.session import createSession, getSessionData
from datetime import datetime

router = APIRouter(prefix="/api")

class Comment(BaseModel):
    boardId: int
    content: str

@router.post('/comment')
async def addComment(data:Comment, session: Annotated[str, Header()] = None):

    info = await getSessionData(session)
    today = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if info is None:
            return 401, {"message": "로그인이 필요합니다."}

    # 댓글 추가 로직
    res = await execute_sql_query("""
            INSERT INTO
                comment (boardId, content, writerId, createdAt) 
                VALUES (%s, %s, %s, %s)""", (data.boardId, data.content, info.idx, today))
    if res is None:
        return 400, {"message": "댓글 추가에 실패하였습니다."}
    else:
        return 200, {'message': '댓글이 추가되었습니다.'}

@router.get('/comment')
async def getComment(boardId:int):
    comments = await execute_sql_query("""
                SELECT 
                    c.idx AS idx, c.content AS content,
                    c.writerId AS writerId, 
                    c.createdAt AS createdAt, 
                    u.nickname  AS writerNickname, 
                FROM 
                    comment AS c 
                left join 
                    user AS u 
                ON 
                    c.writerId = u.idx 
                WHERE  
                    c.boardId = %s 
                ORDER  BY
                    c.createdAt DESC """, (boardId,))
    if comments is None:
        return 400, {"message": "댓글 목록 불러오기에 실패하였습니다."}
    else:
        return 200, {'message': comments}