FROM python:3.9-slim as deps

WORKDIR /tmp
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes --dev

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9-slim as prod
WORKDIR /app
COPY --from=deps /tmp/requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY . .
ENV PYTHONPATH=/app
