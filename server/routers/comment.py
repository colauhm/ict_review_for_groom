from fastapi import APIRouter, Response, Depends, Header
from pydantic import BaseModel
from typing import Annotated
from ..database.query import execute_sql_query
from ..controllers.session import createSession, getSessionData
from datetime import datetime

router = APIRouter(prefix="/api")