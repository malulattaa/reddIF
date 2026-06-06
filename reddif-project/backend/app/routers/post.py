from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.post import (
    PostCreateSchema, PostResponseSchema,
    RespostaCreateSchema, RespostaResponseSchema,
    PostDetalheSchema
)
from app.controller.post import (
    criar_post_controller,
    obter_post_controller,
    criar_resposta_controller,
    marcar_solucao_controller,
)
from app.controller.usuario import login_usuario, cadastrar_usuario
from app.schemas.usuario import UsuarioLogin, TokenResponse, UsuarioCreate, UsuarioResponse
from app.models.usuario import Usuario
from app.controller.auth import obter_usuario_logado

router_auth = APIRouter(prefix="/auth")


@router_auth.post("/cadastro", response_model=UsuarioResponse)
async def cadastro(dados: UsuarioCreate, session: Session = Depends(get_db)):
    return await cadastrar_usuario(dados, session)


@router_auth.post("/login", response_model=TokenResponse)
async def login(dados: UsuarioLogin, session: Session = Depends(get_db)):
    return await login_usuario(dados, session)


@router_auth.post("/post", response_model=PostResponseSchema, status_code=201)
async def criar_post(
    dados: PostCreateSchema,
    usuario: Usuario = Depends(obter_usuario_logado),
    session: Session = Depends(get_db)
):
    return criar_post_controller(dados, usuario.id, session)


@router_auth.get("/post/{post_id}", response_model=PostDetalheSchema)
async def obter_post(post_id: int, session: Session = Depends(get_db)):
    return obter_post_controller(post_id, session)


@router_auth.post("/post/{post_id}/respostas", response_model=RespostaResponseSchema, status_code=201)
async def criar_resposta(
    post_id: int,
    dados: RespostaCreateSchema,
    usuario: Usuario = Depends(obter_usuario_logado),
    session: Session = Depends(get_db)
):
    return criar_resposta_controller(post_id, dados, usuario.id, session)


@router_auth.patch("/post/{post_id}/resolver/{resposta_id}")
async def marcar_solucao(
    post_id: int,
    resposta_id: int,
    usuario: Usuario = Depends(obter_usuario_logado),
    session: Session = Depends(get_db)
):
    return marcar_solucao_controller(post_id, resposta_id, usuario.id, session)


@router_auth.get("/disciplinas")
async def listar_disciplinas(session: Session = Depends(get_db)):
    from app.models.disciplina import Disciplina
    return session.query(Disciplina).all()