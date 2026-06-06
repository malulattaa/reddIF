from pydantic import BaseModel, EmailStr, Field, model_validator
from datetime import datetime
from app.models.usuario import TipoUsuario, CursoUsuario
from app.schemas.duvida import PostPerfilResponse
from typing import List

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str = Field(..., min_length=6)
    confirmar_senha: str
    curso: CursoUsuario

    @model_validator(mode='after')
    def verificar_senhas(self):
        if self.senha != self.confirmar_senha:
            raise ValueError("A senha e a confirmação de senha não coincidem.")
        return self
    
class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    
class UsuarioResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    curso: CursoUsuario
    tipo: TipoUsuario
    pontos: int
    criado_em: datetime
    
    class Config: 
        from_attributes = True
        
class PerfilRespostaUsuario(BaseModel):
    id: int
    conteudo: str
    post_id: int
    criado_em: datetime

class ConquistaInfoResponse(BaseModel):
    nome: str
    descricao: str
    icone: str

    class Config:
        from_attributes = True

class ConquistaPerfilResponse(BaseModel):
    conquista: ConquistaInfoResponse
    conquistado_em: datetime

    class Config:
        from_attributes = True

class UsuarioPerfilResponse(BaseModel):
    id: int
    nome: str
    email: str
    curso: str
    tipo: str
    pontos: int
    criado_em: datetime

    posts: List[PostPerfilResponse]
    respostas: List[PerfilRespostaUsuario]
    conquistas: List[ConquistaPerfilResponse]

    class Config:
        from_attributes = True
    
