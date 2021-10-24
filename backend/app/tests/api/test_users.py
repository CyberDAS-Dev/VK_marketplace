from fastapi.testclient import TestClient

from app.core.config import settings
from app.tests.utils.user import user_auth_header


def test_get_users_me(client: TestClient) -> None:
    id = 1
    header = user_auth_header(id)
    r = client.get(
        f"{settings.BASE_PREFIX}/users/me",
        headers={"Authorization": f"Bearer {header}"},
    )
    current_user = r.json()
    assert current_user
    assert current_user["id"] == id
