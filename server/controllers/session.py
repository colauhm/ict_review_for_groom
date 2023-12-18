from uuid import uuid4
from pydantic import BaseModel


sessionDict = {}  # session_id : SessionData


class SessionData(BaseModel):
    id: str
    nickname: str
    idx: int


async def createSession(email:str, id: str, nickname: str, idx: int):
    session_id = str(uuid4())
    session_data = SessionData(
        email=email, id=id, nickname=nickname, idx=idx)
    sessionDict[session_id] = session_data
    return session_id


async def getSessionData(session_id: str):
    try:
        session_data = sessionDict[session_id]
        if not session_data:
            return False
        return session_data
    except Exception as e:
        return False
