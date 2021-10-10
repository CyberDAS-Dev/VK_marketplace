<br />
<p align="center">
  <a href="https://github.com/CyberDAS-Dev/VK_marketplace/tree/main/backend">
    <img src="https://raw.githubusercontent.com/CyberDAS-Dev/API/main/.github/logo.png" alt="Logo" width="250" height="78">
  </a>

  <h3 align="center">CyberDAS VK Market Backend</h3>
  <p align="center">
    Серверное приложение для Барахолки CyberDAS'a, проекта для локального обмена вещами и услугами
    <br />
    <a href="https://vkmarket.cyberdas.net/api/v1/docs"><strong>Спецификация »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CyberDAS-Dev/VK_marketplace/issues">Сообщить об ошибке</a>
    ·
    <a href="https://github.com/CyberDAS-Dev/VK_marketplace/issues">Предложить идею</a>
  </p>
</p>

<br>
<details open="open">
  <summary>Содержание</summary>
  <ol>
    <li><a href="#о-приложении">О приложении</a></li>
    <li>
      <a href="#приступаем-к-работе">Приступаем к работе</a>
      <ul>
        <li><a href="#необходимое-по">Необходимое ПО</a></li>
        <li><a href="#установка">Установка</a></li>
        <li><a href="#скрипты">Скрипты</a></li>
        <li><a href="#настройка-vs-code">Настройка VS Code</a></li>        
      </ul>
    </li>
    <li><a href="#развертывание">Развертывание</a></li>
    <li><a href="#лицензия">Лицензия</a></li>
    <li><a href="#контакты">Контакты</a></li>
  </ol>
</details>
<br>

<div align="center">
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  </a>
  <a href="https://pytest.org">
    <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Pytest&color=0A9EDC&logo=Pytest&logoColor=FFFFFF&label=" alt="Pytest">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Python&color=3776AB&logo=Python&logoColor=FFFFFF&label=" alt="Python">
  </a>  
  <a href="https://fastapi.tiangolo.com">
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
  </a>
  <a href="https://www.postgresql.org">
    <img src="https://img.shields.io/static/v1?style=for-the-badge&message=PostgreSQL&color=4169E1&logo=PostgreSQL&logoColor=FFFFFF&label=" alt="PostgreSQL">
  </a>
</div>

<br>
<hr>
<br>

## О приложении

Современное, быстрое, асинхронное серверное приложение, предназначенное для использования
в проекте Барахолки CyberDAS.

Хранит всё связанное с объявлениями и предоставляет к ним доступ.

## Приступаем к работе

Следуйте этим шагам, для того чтобы локально развернуть версию приложения и поэкспериментировать с ней.

### Необходимое ПО

[Docker](https://docs.docker.com/engine/install/) и [Docker Compose](https://docs.docker.com/compose/install/) последних версий

Для добавления\обновления зависимостей понадобится [Poetry](https://python-poetry.org/)

### Установка

1. Скопируйте репозиторий
   ```bash
   git clone https://github.com/CyberDAS-Dev/API.git
   ```
2. Перейдите в папку `backend`
    ```bash
    cd backend
    ```
3. Позвольте Docker Compose собрать все необходимые контейнеры и запустить их в фоне:
    ```bash
    docker-compose up -d
    ```

4. API будет доступно по адресу http://127.0.0.1:8888. При этом, все вносимые в код проекта 
изменения сразу отражаются в работающем приложении.

5. По адресу http://127.0.0.1:5050 можно будет получить доступ к управлению базой данных. 
Нужно ввести адрес почты и пароль, указанные в файле `.env` (`PGADMIN_DEFAULT_...`) в 
корневой директории проекта

### Скрипты

1. Запуск тестов
    ```bash
    docker-compose exec backend ./start-test.sh
    ```
2. Линтинг кода
    ```bash
    docker-compose exec backend ./scripts/lint.sh
    ```
3. Автоматическое исправление ошибок и сортировка импортов
    ```bash
    docker-compose exec backend ./scripts/format.sh 
    ```
4. Создание новой миграции базы данных
    ```bash
    docker-compose exec backend alembic revision --autogenerate
    ```

### Настройка VS Code

Для более удобной работы с кодом (автоформатирование, линтинг), рекомендую использовать 
следующие настройки в `.vscode/settings.json`:
```json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": true,
    "python.formatting.provider": "black",
    "python.linting.lintOnSave": true,
    "editor.formatOnSave": true
}
```

Также, для того что бы VS Code прочитал все настройки из `pyproject.toml` и других файлов,
нужно сделать следующее:
1. Создать виртуальное окружение с помощью Poetry
    ```bash
    poetry shell
    ```
2. Выбрать в качестве интепрератора Python (в нижней панели интерфейса VS Code) тот,
у которого в названии будет `cyberdas_vk_marketplace`

## Развертывание

Развертывание проводится не сложнее установки:
  ```bash
  docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
  ```
Обратите внимание, что приложение размещается на 80ый, а не 8888ой порт.

При этом ожидается, что:
1. На хосте присутствует Docker network с названием proxy, в которой находится `traefik`.
2. Если приложение размещается не в корне домена, то дополнительный путь (к 'папке' с приложением) 
должен быть указан в переменной окружения `ROOT_PATH`.
3. На 24224 порте на хосте находится `fluentd`, принимающий логи.

Также, в файле `docker-compose.production.yml` можно объявить некоторые переменные окружения для того, 
чтобы поменять настройки ASGI. Найти их список можно здесь: https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker

В файле `prestart.sh` находятся команды, которые выполняются до запуска сервера. Обычно
туда следует размещать логику, проверяющую, что к БД можно присоединиться, и обновляющую
эту БД до последней миграции.

## Лицензия

Распространяется под лицензией MIT. Смотрите `LICENSE` для дополнительной информации.


## Контакты

Акостелов Иван - payne@cyberdas.net
