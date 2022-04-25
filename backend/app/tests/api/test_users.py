from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.advert import create_random_advert
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


def test_get_users_my_ads(client: TestClient, test_db: Session) -> None:
    id = 1
    header = user_auth_header(id)
    advert1 = create_random_advert(test_db, owner_id=1)
    advert2 = create_random_advert(test_db, owner_id=1)
    create_random_advert(test_db, owner_id=2)

    request = client.get(
        f"{settings.BASE_PREFIX}/users/me/ads",
        headers={"Authorization": f"Bearer {header}"},
    )
    assert request.status_code == 200

    content = request.json()
    assert len(content) == 2

    # Должны быть отсортированы от новых к старым
    assert content[0]["id"] == advert2.id
    assert content[1]["id"] == advert1.id
