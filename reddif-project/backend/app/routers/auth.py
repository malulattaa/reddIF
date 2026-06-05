from database import get_db
from fastapi import APIRouter, Depends
from schemas.duvida import PostResponseSchema, PostCreateSchema
from sqlalchemy.orm import Session
from controller.post import criar_post
from controller.usuario import login_usuario
from schemas.usuario import UsuarioLogin, TokenResponse
from models.usuario import Usuario
from controller.auth import obter_usuario_logado


router_auth = APIRouter(prefix="/auth")

@router_auth.post("/post", response_model = PostResponseSchema)
async def criar_post(dados: PostCreateSchema, usuario: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    return await criar_post(dados, usuario.id, session)


@router_auth.post("/login", response_model=TokenResponse)
async def login(dados: UsuarioLogin, session: Session = Depends(get_db)):
    return await login_usuario(dados, session)