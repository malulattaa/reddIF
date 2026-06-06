from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.usuario import TipoUsuario, CursoUsuario
from app.schemas.duvida import PostPerfilResponse
from typing import List

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    curso: CursoUsuario
    
class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str
    
class TokenResponse(BaseModel):
    acess_token: str
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
    
    class Config: 
        from_attributes = True
    
