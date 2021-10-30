import uuid
from typing import Any

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    HTTPException,
    Request,
    UploadFile,
)
from PIL import UnidentifiedImageError

from app import crud, models
from app.api import deps
from app.core.config import settings
from app.utils.image_ops import open_and_validate

router = APIRouter()


@router.post("/", response_model=str)
async def upload(
    request: Request,
    bg_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Загрузить картинку.
    """
    if not file.content_type.startswith("image/") or (
        not file.content_type.lstrip("image/").upper() in settings.IMAGE_ALLOWED_TYPES
    ):
        raise HTTPException(status_code=415, detail="Неподдерживаемый формат")

    try:
        image = await open_and_validate(file)
    except UnidentifiedImageError:
        raise HTTPException(status_code=415, detail="Неподдерживаемый формат")
    except AssertionError:
        raise HTTPException(status_code=422, detail="Несоответствие требованиям")

    image_name = f"{uuid.uuid4()}-{current_user.id}.jpg"
    bg_tasks.add_task(crud.image.create, image_name, image)

    return f"{request.url}{image_name}"
