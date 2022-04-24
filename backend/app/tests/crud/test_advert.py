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
        cost=1,
        bargain=False,
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
    assert advert.cost == 1
    assert advert.bargain is False
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
        cost=1,
        bargain=False,
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
        cost=1,
        bargain=False,
    )

    user = random_user(test_db)
    created_advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )
    new_description = random_string()
    advert_update = AdvertUpdate(
        title=created_advert.title,
        description=new_description,
        bargain=created_advert.bargain,
        images=created_advert.images,
        cost=1,
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
        bargain=False,
        cost=1,
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


def test_search_advert(test_db: Session) -> None:
    title = "мужская куртка XL"
    description = "продается куртка мужская"
    advert_in = AdvertCreate(
        type=Type.sell,
        category=Category.clothes,
        title=title,
        description=description,
        images=[],
        bargain=False,
        cost=1,
    )
    user = random_user(test_db)
    created_advert = crud.advert.create_with_owner(
        db=test_db, obj_in=advert_in, owner_id=user.id
    )
    crud.advert.create(
        db=test_db,
        obj_in=AdvertCreate(
            type=Type.sell,
            category=Category.clothes,
            title="хм",
            description="бла",
            images=[],
            bargain=False,
            cost=1,
        ),
    )

    search_result = crud.advert.get_multi(test_db, search_term="кУрТ")

    assert len(search_result) == 1
    assert created_advert.id == search_result[0].id
