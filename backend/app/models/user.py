from typing import TYPE_CHECKING

from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

if TYPE_CHECKING:
    from .advert import Advert  # noqa: F401


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    ads = relationship("Advert", back_populates="owner")
