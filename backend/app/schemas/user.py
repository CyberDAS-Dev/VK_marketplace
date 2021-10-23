from datetime import datetime
from typing import List

from pydantic import BaseModel

from .advert import Advert


# Shared properties
class UserBase(BaseModel):
    id: int


# Properties to receive via API on creation
class UserCreate(UserBase):
    pass


class UserInDBBase(UserBase):
    ads: List[Advert] = []

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    created_at: datetime
