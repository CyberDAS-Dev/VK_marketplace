from base64 import b64encode
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlencode

from structlog import get_logger

from app.core.config import settings

logger = get_logger("security")


def vk_auth(raw_params: str) -> bool:
    """
    Проверяем сигнатуру, переданную из VK

    :param dict header: Строка с параметрами запуска
    :returns: Результат проверки подписи
    :rtype: bool
    """
    try:
        param_list = [item.split("=") for item in raw_params.split("&")]
        params = {key: value for key, value in param_list}
    except Exception:
        logger.debug("bad params")
        return False

    if not params.get("sign"):
        logger.debug("sign absent")
        return False

    ordered = {k: params[k] for k in sorted(params)}
    ordered.pop("sign")

    secret = settings.MINI_APP_SECRET_KEY
    hash_code = b64encode(
        HMAC(secret.encode(), urlencode(ordered, doseq=True).encode(), sha256).digest()
    ).decode("utf-8")

    if hash_code[-1] == "=":
        hash_code = hash_code[:-1]

    fixed_hash = hash_code.replace("+", "-").replace("/", "_")
    return params.get("sign") == fixed_hash
