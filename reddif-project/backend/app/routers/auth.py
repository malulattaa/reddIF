from app.database import get_db
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.duvida import PostResponseSchema, PostCreateSchema
from sqlalchemy.orm import Session
from app.controller.post import criar_post_controller
from app.controller.usuario import login_usuario, cadastrar_usuario
from app.schemas.usuario import UsuarioLogin, TokenResponse, UsuarioCreate, UsuarioResponse, UsuarioPerfilResponse
from app.models.usuario import Usuario
from app.controller.auth import obter_usuario_logado


router_auth = APIRouter(prefix="/auth")

@router_auth.post("/post", response_model = PostResponseSchema)
async def criar_post(dados: PostCreateSchema, usuario: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    return criar_post_controller(dados, usuario.id, session)

@router_auth.post("/cadastro", response_model=UsuarioResponse)
async def cadastro(dados: UsuarioCreate, session: Session = Depends(get_db)):
    return await cadastrar_usuario(dados, session)


@router_auth.post("/login", response_model=TokenResponse)
async def login(dados: UsuarioLogin, session: Session = Depends(get_db)):
    return await login_usuario(dados, session)

@router_auth.get("/perfil", response_model=UsuarioPerfilResponse)
async def perfil(usuario_atual: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    return usuario_atual