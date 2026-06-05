from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.usuario import TipoUsuario, CursoUsuario

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
        
