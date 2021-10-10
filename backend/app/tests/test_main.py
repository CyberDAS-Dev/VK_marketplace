from fastapi.testclient import TestClient


def test_read_docs(client: TestClient):
    response = client.get("/v1/docs")
    assert response.status_code == 200
