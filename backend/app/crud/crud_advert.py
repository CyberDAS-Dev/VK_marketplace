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

    def _filter(
        self,
        query: Query,
        owner_id: Optional[int] = None,
        sort: Literal["newer", "older", "cost-asc", "cost-desc"] = None,
        cost_min: Optional[int] = None,
        cost_max: Optional[int] = None,
        category: Optional[Category] = None,
        _type: Optional[Type] = None,
        with_photo: bool = False,
        show_bargain: bool = True,
    ) -> Query:
        if owner_id is not None:
            query = query.filter(Advert.owner_id == owner_id)
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

    def _search(self, query: Query, term: str) -> Query:
        return query.filter(Advert.title.ilike(f"%{term}%")).order_by(
            Advert.title.ilike(f"%{term}%").desc(), Advert.title
        )

    def get_multi(  # type: ignore
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
        search_term: Optional[str] = None,
        **filter_kwargs,
    ) -> List[Advert]:
        query = db.query(self.model)
        if len(filter_kwargs) > 0:
            query = self._filter(query, **filter_kwargs)
        if search_term is not None:
            query = self._search(query, search_term)

        return query.offset(skip).limit(limit).all()


advert = CRUDAdvert(Advert)
