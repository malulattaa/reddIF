from pydantic import BaseModel, Field
from datetime import datetime


class TagSchema(BaseModel):
    id: int
    nome: str

    class Config:
        from_attributes = True


class AutorSchema(BaseModel):
    id: int
    nome: str

    class Config:
        from_attributes = True


class PostCreateSchema(BaseModel):
    titulo: str = Field(..., min_length=3, max_length=100)
    descricao: str = Field(..., min_length=6)
    disciplina_id: int
    tags: list[str] = []
    anonimo: bool = False


class PostResponseSchema(BaseModel):
    id: int
    titulo: str
    descricao: str
    resolvido: bool
    anonimo: bool
    usuario_id: int
    disciplina_id: int
    criado_em: datetime
    tags: list[TagSchema] = []
    quantidade_respostas: int = 0
    autor: AutorSchema | None = None

    class Config:
        from_attributes = True


class RespostaCreateSchema(BaseModel):
    conteudo: str


class RespostaResponseSchema(BaseModel):
    id: int
    conteudo: str
    votos: int
    solucao: bool
    criado_em: datetime
    usuario_id: int

    class Config:
        from_attributes = True


class PostDetalheSchema(PostResponseSchema):
    respostas: list[RespostaResponseSchema] = []