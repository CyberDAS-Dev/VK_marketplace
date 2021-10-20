import time
import uuid
from logging import Logger  # type: ignore
from typing import Callable

from fastapi import Request, Response
from structlog.contextvars import bind_contextvars, clear_contextvars


class LoggingMiddleware:
    def __init__(self, logger: Logger) -> None:
        self.logger = logger

    async def __call__(self, request: Request, call_next: Callable) -> Response:
        clear_contextvars()
        bind_contextvars(
            view=request.url.path,
            request_id=str(uuid.uuid4()),
            peer=request.client.host,
        )
        await self.logger.info("request start")
        start_time = time.time()

        try:
            response = await call_next(request)
        except Exception as e:
            await self.logger.exception(e)
            return Response(
                "Internal Server Error", status_code=500, media_type="text/plain"
            )

        process_time = (time.time() - start_time) * 1000
        formatted_process_time = "{0:.2f}".format(process_time)
        await self.logger.info(
            "request end",
            status_code=response.status_code,
            completed_in=formatted_process_time,
        )

        return response
