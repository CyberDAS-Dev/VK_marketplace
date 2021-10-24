import random
from base64 import b64encode
from hashlib import sha256
from hmac import HMAC
from typing import Optional
from urllib.parse import urlencode

from sqlalchemy.orm import Session

from app import crud
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserCreate


def user_auth_header(id: int) -> str:
    vk_params = {
        "vk_user_id": str(id),
        "vk_app_id": "1",
        "vk_is_app_user": "1",
        "vk_language": "ru",
    }
    ordered = {k: vk_params[k] for k in sorted(vk_params)}

    secret = settings.MINI_APP_SECRET_KEY
    sign = b64encode(
        HMAC(secret.encode(), urlencode(ordered, doseq=True).encode(), sha256).digest()
    ).decode("utf-8")
    if sign[-1] == "=":
        sign = sign[:-1]
    fixed_sign = sign.replace("+", "-").replace("/", "_")

    vk_params.update({"sign": fixed_sign})

    params_string = "&".join([f"{key}={value}" for key, value in vk_params.items()])
    return params_string


def random_user(db: Session, id: Optional[int] = None) -> User:
    user_in = UserCreate(id=id or random.randint(1, 1000))
    user = crud.user.create(db=db, obj_in=user_in)
    return user
