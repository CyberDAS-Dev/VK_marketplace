from sqlalchemy.orm import Session

from app import crud
from app.schemas.advert import AdvertCreate, AdvertUpdate, Category, Type
from app.tests.utils.data import random_string
from app.tests.utils.user import random_user


def test_create_advert(test_db: Session) -> None:
    title = random_string()
    description = random_string()
    advert_in = AdvertCreate(
        type=Type.sell,
        category=Category.misc,
        title=title,
        description=description,
        images=[],
        semi_free=False,
    )

    user = random_user(test_db)
    advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )

    assert advert.type == Type.sell
    assert advert.category == Category.misc
    assert advert.title == title
    assert advert.description == description
    assert advert.images == []
    assert advert.cost is None
    assert advert.semi_free is False
    assert advert.owner_id == user.id


def test_get_advert(test_db: Session) -> None:
    title = random_string()
    description = random_string()
    advert_in = AdvertCreate(
        type=Type.sell,
        category=Category.misc,
        title=title,
        description=description,
        images=[],
        semi_free=False,
    )

    user = random_user(test_db)
    created_advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )

    stored_advert = crud.advert.get(db=test_db, id=created_advert.id)
    assert stored_advert
    assert created_advert.id == stored_advert.id
    assert created_advert.owner_id == stored_advert.owner_id


def test_update_advert(test_db: Session) -> None:
    title = random_string()
    description = random_string()
    advert_in = AdvertCreate(
        type=Type.sell,
        category=Category.misc,
        title=title,
        description=description,
        images=[],
        semi_free=False,
    )

    user = random_user(test_db)
    created_advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )
    new_description = random_string()
    advert_update = AdvertUpdate(
        title=created_advert.title,
        description=new_description,
        semi_free=created_advert.semi_free,
        images=created_advert.images,
    )

    updated_advert = crud.advert.update(
        db=test_db, db_obj=created_advert, obj_in=advert_update
    )
    assert created_advert.id == updated_advert.id
    assert created_advert.title == updated_advert.title
    assert updated_advert.description == new_description
    assert created_advert.owner_id == updated_advert.owner_id


def test_delete_advert(test_db: Session) -> None:
    title = random_string()
    description = random_string()
    advert_in = AdvertCreate(
        type=Type.sell,
        category=Category.misc,
        title=title,
        description=description,
        images=[],
        semi_free=False,
    )

    user = random_user(test_db)
    created_advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )

    deleted_advert = crud.advert.remove(db=test_db, id=created_advert.id)
    requested_advert = crud.advert.get(db=test_db, id=created_advert.id)
    assert requested_advert is None
    assert deleted_advert.id == created_advert.id
    assert deleted_advert.title == title
    assert deleted_advert.description == description
    assert deleted_advert.owner_id == user.id
