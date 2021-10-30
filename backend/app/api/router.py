from fastapi import APIRouter

from .endpoints import adverts, images, users

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(adverts.router, prefix="/items", tags=["adverts"])
api_router.include_router(images.router, prefix="/images", tags=["images"])
