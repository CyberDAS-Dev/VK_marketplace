from logging.config import dictConfig
from typing import Callable, List

import structlog
from pythonjsonlogger import jsonlogger
from structlog.contextvars import merge_contextvars

from app.core.config import settings


# Процессоры логов
def add_app_info(
    _: None, __: None, event_dict: structlog.types.EventDict
) -> structlog.types.EventDict:
    event_dict["app_name"] = settings.APP_NAME
    event_dict["app_version"] = settings.APP_VERSION
    return event_dict


# Настройка логгинга
def setup_structlog() -> None:
    processors: List[Callable] = [
        merge_contextvars,
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        add_app_info,
    ]
    if settings.JSON_LOGGING:
        processors += [structlog.processors.JSONRenderer()]
    else:
        processors += [
            structlog.processors.ExceptionPrettyPrinter(),
            structlog.processors.KeyValueRenderer(),
        ]
    structlog.configure(
        processors=processors,
        context_class=structlog.threadlocal.wrap_dict(dict),
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.AsyncBoundLogger,
        cache_logger_on_first_use=True,
    )


class StructuredJsonFormatter(jsonlogger.JsonFormatter):
    """
    Надстройка над `jsonlogger.JsonFormatter`, добавляющая процессинг к тем логам,
    над которым приложение не имеет контроля.
    """

    time_stamper = structlog.processors.TimeStamper()

    def add_fields(self, log_record, record, message_dict):  # type: ignore
        super(StructuredJsonFormatter, self).add_fields(
            log_record, record, message_dict
        )

        event_dict = {"_record": record}
        event_dict["level"] = record.levelname.lower()  # add_log_level
        event_dict = structlog.stdlib.add_logger_name(None, None, event_dict)
        event_dict = self.time_stamper(None, None, event_dict)
        event_dict = add_app_info(None, None, event_dict)

        del event_dict["_record"]
        log_record.update(event_dict)


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"jsonizer": {"()": StructuredJsonFormatter}},
    "handlers": {
        "default": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        "jsonizer": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
            "formatter": "jsonizer",
        },
    },
    "loggers": {
        "app": {"handlers": ["default"], "level": "DEBUG", "propagate": False},
        "uvicorn": {"error": {"propagate": "true"}},
        "root": {"handlers": ["jsonizer"]},
    },
}


def setup_logging() -> structlog.stdlib.AsyncBoundLogger:
    setup_structlog()
    if not settings.JSON_LOGGING:
        LOGGING["loggers"]["root"]["handlers"] = ["default"]  # type: ignore
    dictConfig(LOGGING)
    return structlog.get_logger("app_root")
