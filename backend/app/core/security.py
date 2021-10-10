from base64 import b64encode
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlencode

from app.core.config import settings


def vk_auth(header: str) -> bool:
    """
    Проверяем сигнатуру, переданную из VK

    :param dict header: Словарь с параметрами запуска
    :returns: Результат проверки подписи
    :rtype: bool
    """
    if "Bearer " not in header:
        return False

    param_list = [item.split("=") for item in header.lstrip("Bearer ").split("&")]
    params = {key: value for key, value in param_list}

    if not params.get("sign"):
        return False

    ordered = {k: params[k] for k in sorted(params)}

    secret = settings.MINI_APP_SECRET_KEY
    hash_code = b64encode(
        HMAC(secret.encode(), urlencode(ordered, doseq=True).encode(), sha256).digest()
    ).decode("utf-8")

    if hash_code[-1] == "=":
        hash_code = hash_code[:-1]

    fixed_hash = hash_code.replace("+", "-").replace("/", "_")
    return params.get("sign") == fixed_hash
