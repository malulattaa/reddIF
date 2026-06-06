from pydantic_settings import BaseSettings
from pathlib import Path

ENV_FILE = Path(__file__).resolve().parent.parent / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = str(ENV_FILE)

settings = Settings()