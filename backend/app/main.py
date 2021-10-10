import os

import structlog
import uvicorn
from fastapi import FastAPI, Request, Response
from starlette.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging
from app.utils.package_info import get_metadata

setup_logging()

prefix = settings.BASE_PREFIX


app = FastAPI(
    **get_metadata(),
    openapi_url=f"{prefix}/openapi.json",
    docs_url=f"{prefix}/docs",
    redoc_url=f"{prefix}/redoc",
    root_path=os.environ.get("ROOT_PATH", ""),
)


logger = structlog.get_logger("app")


@app.middleware("http")
async def exception_logging_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        await logger.exception(e)
        return Response(
            "Internal Server Error", status_code=500, media_type="text/plain"
        )


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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
