import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy_utils import create_database, database_exists, drop_database

from app.api.deps import get_db
from app.core.config import settings
from app.db.base import Base
from app.main import app
from app.tests.utils.user import random_user, user_auth_header


def get_test_db_url() -> str:
    return f"{settings.SQLALCHEMY_DATABASE_URI}_test"


@pytest.fixture
def test_db():
    """
    Модифицировать сессию БД так, что бы она откатывалась после каждого теста.
    Это необходимо для того, чтобы побочные эффекты одного теста не влияли на
    другие тесты.
    """
    # Создаем соединени с тестовой базой данных
    engine = create_engine(get_test_db_url())

    connection = engine.connect()
    trans = connection.begin()

    # Начинаем транзакцию
    test_session_maker = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    test_session = test_session_maker()
    test_session.begin_nested()

    @event.listens_for(test_session, "after_transaction_end")
    def restart_savepoint(s, transaction):
        if transaction.nested and not transaction._parent.nested:
            s.expire_all()
            s.begin_nested()

    yield test_session

    # Откатываем транзакцию после окончания тестов
    test_session.close()
    trans.rollback()
    connection.close()


@pytest.fixture(scope="session", autouse=True)
def create_test_db():
    """
    Создает тестовую базу данных для проведения всех тестов
    """

    test_db_url = get_test_db_url()

    # Создаем тестовую базу данных
    if database_exists(test_db_url):
        drop_database(test_db_url)
    create_database(test_db_url)
    test_engine = create_engine(test_db_url)
    Base.metadata.create_all(test_engine)

    # Проводим тесты
    yield

    # Уничтожаем базу данных
    drop_database(test_db_url)


@pytest.fixture
def client(test_db: Session):
    """
    Возвращает тестового клиента, который читает и пишет из тестовой базы данных.
    """

    def get_test_db():
        yield test_db

    app.dependency_overrides[get_db] = get_test_db

    yield TestClient(app)


@pytest.fixture
def user_header(test_db: Session):
    """
    Создает пользователя и возвращает его заголовок авторизации.
    """
    id = int(os.environ["TEST_USER_ID"]) if "TEST_USER_ID" in os.environ else 1
    random_user(test_db, id=id)
    header = user_auth_header(id)
    return {"Authorization": f"Bearer {header}"}
