from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/me", response_model=schemas.User)
async def read_user_me(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Получить информацию о текущем пользователе.
    """
    return current_user


@router.get("/me/ads", response_model=List[schemas.Advert])
async def read_user_my_ads(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Получить информацию о объявлениях текущего пользователя.
    Сортируются от новых к старым.
    """
    return crud.advert.get_multi(
        db=db, owner_id=current_user.id, skip=skip, limit=limit, sort="newer"
    )
