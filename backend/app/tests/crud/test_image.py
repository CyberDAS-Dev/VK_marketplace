from pathlib import Path

from PIL import Image

from app import crud
from app.core.config import settings


def test_create_image() -> None:
    image = Image.open("app/tests/data/good_image.jpg")
    file_name = crud.image.create("blank_image.jpg", image)
    assert image.fp is None  # убеждаемся, что файл закрыт

    path = Path(f"{settings.IMAGE_DIR}/{file_name}")
    assert path.exists()
    path.unlink()


def test_remove_image() -> None:
    image = Image.open("app/tests/data/good_image.jpg")
    file_name = crud.image.create("image_to_delete.jpg", image)
    path = Path(f"{settings.IMAGE_DIR}/{file_name}")
    assert path.exists()

    file_name = crud.image.remove("image_to_delete.jpg")
    assert not path.exists()
