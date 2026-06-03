from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PostCreateSchema(BaseModel):
    titulo: str = Field(..., min_length=3, max_length=100, description="Titulo do post")
    descricao: str = Field(..., min_length=6, description="Descricao do post")
    anonimo: bool = False
    disciplia_id = int
    
    
class PostResponseSchema(BaseModel):
    id = int
    titulo = str
    descicao = str
    anonimo = bool
    usuario_id = int
    disciplina_id = int
    criado_em = datetime
    
    class Config: 
        from_attributes = True