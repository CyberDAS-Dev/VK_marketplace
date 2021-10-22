import enum
from typing import TYPE_CHECKING

from sqlalchemy import (
    ARRAY,
    Boolean,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Category(enum.Enum):
    misc = 1
    food = 2
    clothes = 3
    books = 4
    electronics = 5
    household = 6
    furniture = 7


class Type(enum.Enum):
    sell = 1
    buy = 2
    service = 3
    performer = 4


class Advert(Base):
    id = Column(Integer, primary_key=True)
    type = Column(Enum(Type), nullable=False)
    category = Column(Enum(Category), nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(String, index=True, nullable=True)
    cost = Column(Integer, nullable=True)
    semi_free = Column(Boolean, nullable=False)
    images = Column(ARRAY(String, dimensions=1), nullable=False)
    views = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="ads")
