from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.advert import AdvertCreate, Category, Type
from app.tests.utils.data import random_string
from app.tests.utils.user import random_user


def create_random_advert(
    db: Session,
    *,
    type: Type = Type.sell,
    category: Category = Category.misc,
    owner_id: Optional[int] = None,
    cost: int = 1,
    bargain: bool = False,
    images: list = [],
) -> models.Advert:
    if owner_id is None:
        user = random_user(db)
        owner_id = user.id
    else:
        if not crud.user.get(db, owner_id):
            random_user(db, owner_id)
    title = random_string()
    description = random_string()
    advert_in = AdvertCreate(
        type=type,
        category=category,
        title=title,
        description=description,
        cost=cost,
        bargain=bargain,
        images=images,
    )
    return crud.advert.create_with_owner(db=db, obj_in=advert_in, owner_id=owner_id)
