import re
from typing import Generator

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from structlog import get_logger

from app import crud, models
from app.core import security
from app.db.session import SessionLocal
from app.schemas.user import UserCreate

logger = get_logger("deps")

vk_auth = HTTPBearer(
    scheme_name="VK Auth", description="Параметры запуска с платформы VK Mini Apps"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


async def get_current_user(
    db: Session = Depends(get_db),
    authorization: HTTPAuthorizationCredentials = Depends(vk_auth),
) -> models.User:
    params = authorization.credentials

    auth = security.vk_auth(params)
    if auth is False:
        logger.debug("bad auth")
        raise HTTPException(
            status_code=401, detail="Некорректные данные для авторизации"
        )

    id_re = re.search(r"vk_user_id=(\d+)", params)
    assert id_re is not None
    id = id_re.group(1)

    user = crud.user.get(db, id=id)
    if not user:
        logger.info("new user", user_id=id)
        user = crud.user.create(db, obj_in=UserCreate(id=id))

    return user
