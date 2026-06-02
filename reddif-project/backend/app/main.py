from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ReddIF API",
    description="API da plataforma colaborativa de monitoria do IFMS",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ReddIF API funcionando!"}