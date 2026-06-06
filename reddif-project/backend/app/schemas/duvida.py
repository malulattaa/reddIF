from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class PostCreateSchema(BaseModel):
    titulo: str = Field(..., min_length=3, max_length=100, description="Titulo do post")
    descricao: str = Field(..., min_length=6, description="Descricao do post")
    anonimo: bool = False
    disciplina_id: int


class PostResponseSchema(BaseModel):
    id: int
    titulo: str
    descricao: str
    anonimo: bool
    usuario_id: int
    disciplina_id: int
    criado_em: datetime

    class Config:
        from_attributes = True


class PostPerfilResponse(BaseModel):
    id: int
    titulo: str
    disciplina: str
    criado_em: datetime


class PostFeedResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    autor: str
    categoria: str
    criado_em: datetime
    tags: List[str]
    curtidas: int
    respostas: int
    respondida: bool


class DisciplinaResponse(BaseModel):
    id: int
    nome: str

    class Config:
        from_attributes = True
