import os
import random
from typing import Optional

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.schemas.advert import Category, Type
from app.tests.utils.advert import create_random_advert

os.environ["TEST_USER_ID"] = "1"


def test_read_ads(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db)
    advert2 = create_random_advert(test_db)
    response = client.get(f"{settings.BASE_PREFIX}/items/")
    assert response.status_code == 200

    content = response.json()
    assert len(content) == 2

    assert content[0]["title"] == advert2.title
    assert content[0]["id"] == advert2.id
    assert content[1]["title"] == advert1.title
    assert content[1]["id"] == advert1.id


def test_search_ads(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db)
    create_random_advert(test_db)
    response = client.get(f"{settings.BASE_PREFIX}/items/?search={advert1.title[:-1]}")
    assert response.status_code == 200

    content = response.json()
    assert len(content) == 1

    assert content[0]["title"] == advert1.title
    assert content[0]["id"] == advert1.id


def test_read_ad(client: TestClient, test_db: Session) -> None:
    advert = create_random_advert(test_db)
    response = client.get(f"{settings.BASE_PREFIX}/items/{advert.id}")
    assert response.status_code == 200

    content = response.json()
    assert content["title"] == advert.title
    assert content["description"] == advert.description
    assert content["id"] == advert.id
    assert content["owner_id"] == advert.owner_id


def test_read_ad_unexisting(client: TestClient) -> None:
    response = client.get(f"{settings.BASE_PREFIX}/items/{random.randint(1, 1000)}")
    assert response.status_code == 404


def test_create_ad(client: TestClient, user_header: dict) -> None:
    data = {
        "type": "sell",
        "category": "misc",
        "title": "Раз",
        "description": "Два",
        "bargain": False,
        "cost": 1,
        "images": ["https://url.net"],
    }
    response = client.post(
        f"{settings.BASE_PREFIX}/items/", headers=user_header, json=data
    )
    assert response.status_code == 201
    content = response.json()

    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_update_ad(client: TestClient, test_db: Session, user_header: dict) -> None:
    advert = create_random_advert(test_db, owner_id=1)

    new_data = {
        "title": "Два",
        "description": "Три",
        "bargain": True,
        "cost": 1,
        "images": ["https://url3.net"],
    }
    response = client.put(
        f"{settings.BASE_PREFIX}/items/{advert.id}", headers=user_header, json=new_data
    )
    assert response.status_code == 200
    content = response.json()

    assert content["title"] == new_data["title"]
    assert content["description"] == new_data["description"]
    assert content["images"] == new_data["images"]
    assert content["id"] == advert.id
    assert content["owner_id"] == 1


def test_update_ad_unexisting(client: TestClient, user_header: dict) -> None:
    new_data = {
        "title": "Два",
        "description": "Три",
        "bargain": True,
        "cost": 1,
        "images": ["https://url3.net"],
    }
    response = client.put(
        f"{settings.BASE_PREFIX}/items/{random.randint(10, 1000)}",
        headers=user_header,
        json=new_data,
    )
    assert response.status_code == 404


def test_update_ad_foreign(
    client: TestClient, test_db: Session, user_header: dict
) -> None:
    advert = create_random_advert(test_db, owner_id=100)
    new_data = {
        "title": "Два",
        "description": "Три",
        "bargain": True,
        "cost": 1,
        "images": ["https://url3.net"],
    }
    response = client.put(
        f"{settings.BASE_PREFIX}/items/{advert.id}", headers=user_header, json=new_data
    )
    assert response.status_code == 403


def test_delete_ad(client: TestClient, test_db: Session, user_header: dict) -> None:
    advert = create_random_advert(test_db, owner_id=1)
    response = client.delete(
        f"{settings.BASE_PREFIX}/items/{advert.id}", headers=user_header
    )
    assert response.status_code == 200
    content = response.json()

    assert content["id"] == advert.id
    assert content["owner_id"] == 1


def test_delete_unexisting(
    client: TestClient, test_db: Session, user_header: dict
) -> None:
    response = client.delete(
        f"{settings.BASE_PREFIX}/items/{random.randint(10, 1000)}", headers=user_header
    )
    assert response.status_code == 404


def test_delete_ad_foreign(
    client: TestClient, test_db: Session, user_header: dict
) -> None:
    advert = create_random_advert(test_db, owner_id=100)
    response = client.delete(
        f"{settings.BASE_PREFIX}/items/{advert.id}", headers=user_header
    )
    assert response.status_code == 403


def test_filter_by_cost(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db, cost=500)
    advert2 = create_random_advert(test_db, cost=100)

    def check(
        how_much: int, *, cost_min: Optional[int] = None, cost_max: Optional[int] = None
    ) -> dict:
        string = []
        if cost_max is not None:
            string.append(f"cost_max={cost_max}")
        if cost_min is not None:
            string.append(f"cost_min={cost_min}")
        response = client.get(f"{settings.BASE_PREFIX}/items/?{'&'.join(string)}")
        assert response.status_code == 200
        content = response.json()
        assert len(content) == how_much
        return content

    check(2, cost_min=0)
    check(2, cost_min=50)
    check(2, cost_min=100)
    assert check(1, cost_min=499)[0]["id"] == advert1.id
    assert check(1, cost_min=500)[0]["id"] == advert1.id
    check(0, cost_min=501)
    assert check(1, cost_max=200)[0]["id"] == advert2.id
    assert check(1, cost_min=101, cost_max=500)[0]["id"] == advert1.id
    assert check(1, cost_min=100, cost_max=499)[0]["id"] == advert2.id
    check(0, cost_min=101, cost_max=499)
    check(2, cost_min=100, cost_max=500)


def test_filter_by_bargain(client: TestClient, test_db: Session) -> None:
    create_random_advert(test_db, bargain=True)
    advert2 = create_random_advert(test_db, bargain=False)

    response = client.get(f"{settings.BASE_PREFIX}/items/?show_bargain=0")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert2.id

    response = client.get(f"{settings.BASE_PREFIX}/items/?show_bargain=1")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2


def test_filter_by_cost_sort(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db, cost=500)
    advert2 = create_random_advert(test_db, cost=100)

    # Сортировка цены по возрастанию:
    response = client.get(f"{settings.BASE_PREFIX}/items/?sort=cost-asc")

    assert response.status_code == 200
    content = response.json()
    assert content[0]["id"] == advert2.id

    # Сортировка цены по убыванию:
    response = client.get(f"{settings.BASE_PREFIX}/items/?sort=cost-desc")

    assert response.status_code == 200
    content = response.json()
    assert content[0]["id"] == advert1.id


def test_filter_by_time_sort(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db)
    advert2 = create_random_advert(test_db)
    advert3 = create_random_advert(test_db)

    # Сортировка "сначала старые":
    response = client.get(f"{settings.BASE_PREFIX}/items/?sort=older")

    assert response.status_code == 200
    content = response.json()
    assert content[0]["id"] == advert1.id
    assert content[1]["id"] == advert2.id
    assert content[2]["id"] == advert3.id

    # Сортировка "сначала новые":
    response = client.get(f"{settings.BASE_PREFIX}/items/?sort=newer")

    assert response.status_code == 200
    content = response.json()
    assert content[0]["id"] == advert3.id
    assert content[1]["id"] == advert2.id
    assert content[2]["id"] == advert1.id


def test_filter_by_photo_only(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db, images=["http://abc.com"])
    create_random_advert(test_db, images=[])

    response = client.get(f"{settings.BASE_PREFIX}/items/?with_photo=1")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert1.id


def test_filter_by_category(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db, category=Category.books)
    advert2 = create_random_advert(test_db, category=Category.electronics)
    create_random_advert(test_db, category=Category.misc)

    response = client.get(f"{settings.BASE_PREFIX}/items/?category=food")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 0

    response = client.get(f"{settings.BASE_PREFIX}/items/?category=books")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert1.id

    response = client.get(f"{settings.BASE_PREFIX}/items/?category=electronics")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert2.id


def test_filter_by_type(client: TestClient, test_db: Session) -> None:
    advert1 = create_random_advert(test_db, type=Type.buy)
    advert2 = create_random_advert(test_db, type=Type.performer)

    response = client.get(f"{settings.BASE_PREFIX}/items/?type=sell")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 0

    response = client.get(f"{settings.BASE_PREFIX}/items/?type=buy")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert1.id

    response = client.get(f"{settings.BASE_PREFIX}/items/?type=performer")

    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["id"] == advert2.id
