from app.schemas.usuario import TokenResponse, UsuarioLogin, UsuarioCreate
import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from fastapi import HTTPException, status
import os
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta


load_dotenv() 

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACESS_TOKEN_EXPIRE = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

def gerar_token_acesso(dados: dict) -> str:
    dados_para_criptografar = dados.copy()
    tempo_expiracao = datetime.now(timezone.utc) + timedelta(minutes=int(ACESS_TOKEN_EXPIRE))
    dados_para_criptografar.update({"exp": tempo_expiracao})
    
    token_jwt = jwt.encode(dados_para_criptografar, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

async def cadastrar_usuario(dados: UsuarioCreate, session: Session):
    try:
        
        usuario_existente= session.query(Usuario).filter(Usuario.email == dados.email).first()
        
        if usuario_existente:
            raise HTTPException(status_code=400, detail="Este E-mail já está cadastrado")
        
        novo_usuario = Usuario(
            nome=dados.nome,
            email=dados.email,
            curso=dados.curso
        )
        novo_usuario.hash_senha(dados.senha)
        
        session.add(novo_usuario)
        session.commit()
        session.refresh(novo_usuario)
        return novo_usuario

    except HTTPException:
        raise
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def login_usuario(dados: UsuarioLogin, session: Session):
    usuario = session.query(Usuario).filter(Usuario.email == dados.email). first()
    
    if not usuario or not usuario.verificar_senha(dados.senha):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")
    
    token = gerar_token_acesso(dados={"sub": str(usuario.id)})
    
    return {"acess_token": token, "token_type": "bearer"}
