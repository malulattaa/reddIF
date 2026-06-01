from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
# add url do banco

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# toda vez que a API receber uma requisição e precisar buscar ou salvar algo, ela abre uma sessão, faz o que precisa e fecha

Base = declarative_base()
# classe que os models vão herdar

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()