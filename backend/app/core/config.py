from pathlib import Path
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, validator

from app.utils.package_info import get_metadata


class Settings(BaseSettings):
    APP_NAME: str = get_metadata()["title"]
    APP_VERSION: str = get_metadata()["version"]
    BASE_PREFIX: str = "/v1"
    MINI_APP_SECRET_KEY: str
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    JSON_LOGGING: bool = False

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    IMAGE_DIR: str = "images"

    @validator("IMAGE_DIR", pre=True)
    def assemble_image_dir(cls, v: str, values: Dict[str, Any]) -> Any:
        if not Path.exists(Path(v)):
            Path.mkdir(Path(v))
        return v

    IMAGE_ALLOWED_TYPES: List[str] = ["JPEG", "PNG"]
    IMAGE_MIN_PIXEL: int = 375
    IMAGE_MAX_PIXEL: int = 3840
    IMAGE_QUALITY: Union[int, str] = "web_high"
    IMAGE_GOOD_PIXEL: int = 1080

    class Config:
        case_sensitive = True


settings = Settings()
