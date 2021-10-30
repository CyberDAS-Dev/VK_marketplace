from pathlib import Path

from PIL import Image

from app.core.config import settings
from app.utils.image_ops import save


class CRUDImage:
    def create(self, name: str, obj_in: Image.Image) -> str:
        save(name, obj_in)
        return name

    def remove(self, name: str) -> str:
        image_path = Path(settings.IMAGE_DIR).joinpath(name)
        image_path.unlink(missing_ok=True)
        return str(image_path)


image = CRUDImage()
