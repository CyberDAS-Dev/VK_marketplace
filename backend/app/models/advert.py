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
    Text,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Category(enum.Enum):
    misc = "misc"
    food = "food"
    clothes = "clothes"
    books = "books"
    electronics = "electronics"
    household = "household"
    furniture = "furniture"


class Type(enum.Enum):
    sell = "sell"
    buy = "buy"
    service = "service"
    performer = "performer"


class Advert(Base):
    id = Column(Integer, primary_key=True)
    type = Column(Enum(Type), nullable=False)
    category = Column(Enum(Category), nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    cost = Column(Integer, nullable=False)
    bargain = Column(Boolean, nullable=False)
    images = Column(ARRAY(String, dimensions=1), nullable=False)
    views = Column(Integer, nullable=False, server_default="0")
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="ads")
