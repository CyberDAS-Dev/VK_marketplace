import random

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas.user import UserCreate
from app.tests.utils.data import random_string
from app.tests.utils.user import user_auth_header


def test_create_user(test_db: Session) -> None:
    id = 1
    user_in = UserCreate(id=id)
    user = crud.user.create(test_db, obj_in=user_in)
    assert user.id == id


def test_authenticate_user(test_db: Session) -> None:
    id = 1
    user_in = UserCreate(id=id)
    user = crud.user.create(test_db, obj_in=user_in)

    authenticated_user = crud.user.authenticate(
        test_db, id=id, auth_header=user_auth_header(id)
    )
    assert authenticated_user
    assert user.id == authenticated_user.id


def test_not_authenticate_user(test_db: Session) -> None:
    user = crud.user.authenticate(
        test_db, id=random.randint(1, 1000), auth_header=random_string()
    )
    assert user is None


def test_get_user(test_db: Session) -> None:
    id = 1
    user_in = UserCreate(id=id)
    created_user = crud.user.create(test_db, obj_in=user_in)
    stored_user = crud.user.get(test_db, id=created_user.id)
    assert stored_user
    assert created_user.id == stored_user.id
    assert jsonable_encoder(created_user) == jsonable_encoder(stored_user)
