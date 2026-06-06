from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
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
from app.schemas.usuario import UsuarioLogin, TokenResponse, UsuarioCreate, UsuarioResponse, UsuarioPerfilResponse
from app.models.usuario import Usuario
from app.controller.auth import obter_usuario_logado

from app.schemas.post import DisciplinaSchema


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


@router_auth.get("/disciplinas", response_model=list[DisciplinaSchema])
async def listar_disciplinas(session: Session = Depends(get_db)):
    from app.models.disciplina import Disciplina
    return session.query(Disciplina).all()

@router_auth.get("/feed", response_model=list[PostResponseSchema])
async def feed(
    page: int = 1,
    limit: int = 20,
    disciplina_id: int | None = None,
    resolvido: bool | None = None,
    session: Session = Depends(get_db)
):
    from app.models.duvida import Post
    query = session.query(Post)

    if disciplina_id:
        query = query.filter(Post.disciplina_id == disciplina_id)

    if resolvido is not None:
        query = query.filter(Post.resolvido == resolvido)

    posts = query.order_by(Post.criado_em.desc()).offset((page - 1) * limit).limit(limit).all()

    return [
        PostResponseSchema(
            **post.__dict__,
            autor=None if post.anonimo else post.usuario,
            quantidade_respostas=len(post.respostas),
        )
        for post in posts
    ]
@router_auth.get("/perfil", response_model=UsuarioPerfilResponse)
async def perfil(usuario_atual: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    return usuario_atual

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


