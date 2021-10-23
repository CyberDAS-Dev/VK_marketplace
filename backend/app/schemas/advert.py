from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, HttpUrl

from app.models.advert import Category, Type


# Shared properties
class AdvertBase(BaseModel):
    title: str
    description: Optional[str] = None
    cost: Optional[int]
    semi_free: bool
    images: List[HttpUrl]


# Properties to receive on item creation
class AdvertCreate(AdvertBase):
    type: Type
    category: Category


# Properties to receive on item update
class AdvertUpdate(AdvertBase):
    pass


# Properties shared by models stored in DB
class AdvertInDBBase(AdvertBase):
    id: int
    type: Type
    category: Category
    views: int
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Advert(AdvertInDBBase):
    pass


# Properties stored in DB
class AdvertInDB(AdvertInDBBase):
    created_at: datetime
