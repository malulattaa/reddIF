from pydantic import BaseModel, EmailStr, Field, model_validator
from datetime import datetime
from app.models.usuario import TipoUsuario, CursoUsuario

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
        
