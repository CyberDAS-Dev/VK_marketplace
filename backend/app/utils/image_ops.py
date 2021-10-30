import os
from io import BytesIO

from fastapi import UploadFile
from PIL import Image

from app.core.config import settings


async def open_and_validate(obj_in: UploadFile) -> Image.Image:
    byte_stream = await obj_in.read()
    if isinstance(byte_stream, str):
        byte_stream = bytes(byte_stream.encode())

    image = Image.open(BytesIO(byte_stream))
    try:
        assert image.format in settings.IMAGE_ALLOWED_TYPES
        assert (
            min(image.size) >= settings.IMAGE_MIN_PIXEL
            and max(image.size) <= settings.IMAGE_MAX_PIXEL
        )
    except AssertionError as e:
        image.close()
        raise e
    finally:
        await obj_in.close()
    return image


def save(name: str, image: Image.Image) -> str:
    image_path = os.path.join(settings.IMAGE_DIR, name)
    try:
        image = resize(image)
        if image.mode != "RGB":
            image = image.convert("RGB")
        image.save(image_path, quality=settings.IMAGE_QUALITY)
    finally:
        image.close()
    return image_path


def resize(image: Image.Image) -> Image.Image:
    width, height = image.size
    if max(width, height) > settings.IMAGE_GOOD_PIXEL:
        resize_ratio = settings.IMAGE_GOOD_PIXEL / max(width, height)
        new_size = (int(resize_ratio * x) for x in (width, height))
        image = image.resize(new_size)
    return image
