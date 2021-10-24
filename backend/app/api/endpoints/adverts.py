from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Advert])
async def read_ads(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
) -> Any:
    """
    Получить список объявлений.
    """
    if search is not None:
        adverts = crud.advert.search_multi(db=db, term=search, skip=skip, limit=limit)
    else:
        adverts = crud.advert.get_multi(db=db, skip=skip, limit=limit)
        # сортировка по id эквивалентна сортировке по дате создания
        adverts.sort(key=lambda ad: ad.id, reverse=True)
    return adverts


@router.post("/", response_model=schemas.Advert, status_code=201)
async def create_ad(
    *,
    db: Session = Depends(deps.get_db),
    advert_in: schemas.AdvertCreate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Создать новое объявление.
    """
    advert = crud.advert.create_with_owner(
        db=db, obj_in=advert_in, owner_id=current_user.id
    )
    return advert


@router.get("/{id}", response_model=schemas.Advert)
async def read_ad(*, db: Session = Depends(deps.get_db), id: int) -> Any:
    """
    Получить объявление по его идентификатору.
    """
    advert = crud.advert.get(db=db, id=id)
    if not advert:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return advert


@router.put("/{id}", response_model=schemas.Advert)
async def update_ad(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    advert_in: schemas.AdvertUpdate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Обновить объявление.
    """
    advert = crud.advert.get(db=db, id=id)
    if not advert:
        raise HTTPException(status_code=404, detail="Объявление не найдено")

    if advert.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Недостаточно прав")

    advert = crud.advert.update(db=db, db_obj=advert, obj_in=advert_in)
    return advert


@router.delete("/{id}", response_model=schemas.Advert)
async def delete_ad(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Удалить объявление.
    """
    advert = crud.advert.get(db=db, id=id)
    if not advert:
        raise HTTPException(status_code=404, detail="Объявление не найдено")

    if advert.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Недостаточно прав")

    advert = crud.advert.remove(db=db, id=id)
    return advert
