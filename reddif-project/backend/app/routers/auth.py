from app.database import get_db
from fastapi import APIRouter, Depends
from app.schemas.duvida import PostResponseSchema, PostCreateSchema
from sqlalchemy.orm import Session, joinedload
from app.controller.post import criar_post_controller
from app.controller.usuario import login_usuario, cadastrar_usuario
from app.schemas.usuario import UsuarioLogin, TokenResponse, UsuarioCreate, UsuarioResponse, UsuarioPerfilResponse
from app.models.usuario import Usuario
from app.models.usuario_conquista import UsuarioConquista
from app.models.duvida import Post
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
    usuario = (
        session.query(Usuario)
        .options(
            joinedload(Usuario.posts).joinedload(Post.disciplina),
            joinedload(Usuario.respostas),
            joinedload(Usuario.conquistas).joinedload(UsuarioConquista.conquista),
        )
        .filter(Usuario.id == usuario_atual.id)
        .first()
    )

    return {
        "id": usuario.id,
        "nome": usuario.nome,
        "email": usuario.email,
        "curso": usuario.curso.value if hasattr(usuario.curso, "value") else usuario.curso,
        "tipo": usuario.tipo.value if hasattr(usuario.tipo, "value") else usuario.tipo,
        "pontos": usuario.pontos,
        "criado_em": usuario.criado_em,
        "posts": [
            {
                "id": p.id,
                "titulo": p.titulo,
                "disciplina": p.disciplina.nome if p.disciplina else "Geral",
                "criado_em": p.criado_em,
            }
            for p in usuario.posts
        ],
        "respostas": [
            {
                "id": r.id,
                "conteudo": r.conteudo,
                "post_id": r.post_id,
                "criado_em": r.criado_em,
            }
            for r in usuario.respostas
        ],
        "conquistas": [
            {
                "conquista": {
                    "nome": uc.conquista.nome,
                    "descricao": uc.conquista.descricao,
                    "icone": uc.conquista.icone,
                },
                "conquistado_em": uc.conquistado_em,
            }
            for uc in usuario.conquistas
        ],
    }