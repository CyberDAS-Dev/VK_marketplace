from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import vk_auth
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate


class CRUDUser(CRUDBase[User, UserCreate, None]):  # type: ignore
    def update(  # type: ignore
        self, db: Session, *, db_obj: User, obj_in: Union[None, Dict[str, Any]]
    ) -> Exception:
        raise NotImplementedError

    def authenticate(self, db: Session, *, id: int, auth_header: str) -> Optional[User]:
        user = self.get(db, id=id)
        if not user:
            return None
        if not vk_auth(auth_header):
            return None
        return user


user = CRUDUser(User)
