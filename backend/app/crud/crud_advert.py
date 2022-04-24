from typing import List, Literal, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Query, Session
from sqlalchemy.sql import desc, func

from app.crud.base import CRUDBase
from app.models.advert import Advert, Category, Type
from app.schemas.advert import AdvertCreate, AdvertUpdate


class CRUDAdvert(CRUDBase[Advert, AdvertCreate, AdvertUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: AdvertCreate, owner_id: int
    ) -> Advert:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Advert]:
        return (
            db.query(self.model)
            .filter(Advert.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def search(self, db: Session, term: str) -> Optional[Advert]:
        return db.query(self.model).filter(Advert.title.ilike(f"%{term}%")).first()

    def search_multi(
        self, db: Session, term: str, *, skip: int = 0, limit: int = 100
    ) -> List[Advert]:
        return (
            db.query(self.model)
            .filter(Advert.title.ilike(f"%{term}%"))
            .order_by(Advert.title.ilike(f"%{term}%").desc(), Advert.title)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def _filter(
        self,
        query: Query,
        sort: Literal["newer", "older", "cost-asc", "cost-desc"],
        cost_min: Optional[int],
        cost_max: Optional[int],
        category: Optional[Category],
        _type: Optional[Type],
        with_photo: bool,
        show_bargain: bool,
    ) -> Query:
        if _type is not None:
            query = query.filter(Advert.type == _type)
        if category is not None:
            query = query.filter(Advert.category == category)

        if cost_max is not None:
            query = query.filter(Advert.cost <= cost_max)
        if cost_min is not None:
            query = query.filter(Advert.cost >= cost_min)

        if with_photo:
            query = query.filter(func.cardinality(Advert.images) > 0)
        if not show_bargain:
            query = query.filter(Advert.bargain == False)  # noqa: E712

        # сортировка по id эквивалентна сортировке по дате создания
        if sort == "newer":
            query = query.order_by(desc(Advert.id))
        elif sort == "older":
            query = query.order_by(Advert.id)
        elif sort == "cost-asc":
            query = query.order_by(Advert.cost)
        elif sort == "cost-desc":
            query = query.order_by(desc(Advert.cost))

        return query

    def search_multi_with_filter(  # type: ignore
        self,
        db: Session,
        term: str,
        *,
        skip: int = 0,
        limit: int = 100,
        **filter_kwargs,
    ) -> List[Advert]:
        return (
            self._filter(db.query(self.model), **filter_kwargs)
            .filter(Advert.title.ilike(f"%{term}%"))
            .order_by(Advert.title.ilike(f"%{term}%").desc(), Advert.title)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_multi_with_filter(  # type: ignore
        self, db: Session, *, skip: int = 0, limit: int = 100, **filter_kwargs
    ) -> List[Advert]:
        return (
            self._filter(db.query(self.model), **filter_kwargs)
            .offset(skip)
            .limit(limit)
            .all()
        )


advert = CRUDAdvert(Advert)
