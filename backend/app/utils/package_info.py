import toml


def get_metadata() -> dict:
    with open("./pyproject.toml") as pyproject:
        poetry_info = toml.loads(pyproject.read())["tool"]["poetry"]
    author = poetry_info["authors"][0].split(" ")
    author_name = " ".join(author[:-1])
    author_email = author[-1].lstrip("<").rstrip(">")

    return {
        "title": poetry_info["name"],
        "description": poetry_info["description"],
        "version": poetry_info["version"],
        "license_info": {"name": poetry_info["license"]},
        "contact": {"name": author_name, "email": author_email},
    }
