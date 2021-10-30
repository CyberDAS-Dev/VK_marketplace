from os import unlink

from fastapi.testclient import TestClient

from app.core.config import settings


def test_upload_and_get_images(client: TestClient, user_header: dict) -> None:
    with open("app/tests/data/good_image.jpg", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": ("good_image.jpg", f, "image/jpeg")},
            headers=user_header,
        )
    assert r.status_code == 200

    image_location = r.text.strip('"')
    r2 = client.get(image_location)
    assert r2.status_code == 200

    # dirty teardown
    unlink(f"{settings.IMAGE_DIR}/{image_location.split('/')[-1]}")


def test_upload_images_not_image_header(client: TestClient, user_header: dict) -> None:
    with open("app/tests/data/good_image.jpg", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": ("good_image.jpg", f, "application/json")},
            headers=user_header,
        )
    assert r.status_code == 415


def test_upload_images_not_image_file(client: TestClient, user_header: dict) -> None:
    with open("app/tests/.gitignore", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": (".gitignore", f, "image/jpeg")},
            headers=user_header,
        )
    assert r.status_code == 415


def test_upload_images_bad_format(client: TestClient, user_header: dict) -> None:
    # forged multipart headers
    with open("app/tests/data/strange_image.webp", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": ("strange_image.webp", f, "image/jpeg")},
            headers=user_header,
        )
    assert r.status_code == 422


def test_upload_images_big_image(client: TestClient, user_header: dict) -> None:
    with open("app/tests/data/big_image.jpg", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": ("big_image.jpg", f, "image/jpeg")},
            headers=user_header,
        )
    assert r.status_code == 422


def test_upload_images_small_image(client: TestClient, user_header: dict) -> None:
    with open("app/tests/data/small_image.jpg", "rb") as f:
        r = client.post(
            f"{settings.BASE_PREFIX}/images/",
            files={"file": ("small_image.jpg", f, "image/jpeg")},
            headers=user_header,
        )
    assert r.status_code == 422
