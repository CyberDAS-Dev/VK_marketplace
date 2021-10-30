import os

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging
from app.middleware.logger import LoggerMiddleware
from app.utils.package_info import get_metadata

prefix = settings.BASE_PREFIX

app = FastAPI(
    **get_metadata(),
    openapi_url=f"{prefix}/openapi.json",
    docs_url=f"{prefix}/docs",
    redoc_url=f"{prefix}/redoc",
    root_path=os.environ.get("ROOT_PATH", ""),
)


logger = setup_logging()
app.middleware("http")(LoggerMiddleware(logger=logger))


# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=prefix)

# Находится не в роутере картинок из-за https://github.com/tiangolo/fastapi/issues/1469
app.mount(f"{prefix}/images", StaticFiles(directory=settings.IMAGE_DIR), name="images")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
