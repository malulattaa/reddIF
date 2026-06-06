from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.database import get_db
from app.models.duvida import Post
from app.models.disciplina import Disciplina
from app.schemas.duvida import PostFeedResponse, DisciplinaResponse

router_duvidas = APIRouter()


@router_duvidas.get("/duvidas", response_model=List[PostFeedResponse])
def listar_duvidas(session: Session = Depends(get_db)):
    posts = (
        session.query(Post)
        .options(
            joinedload(Post.usuario),
            joinedload(Post.disciplina),
            joinedload(Post.tags),
            joinedload(Post.curtidas),
            joinedload(Post.respostas),
        )
        .order_by(Post.criado_em.desc())
        .all()
    )

    return [
        {
            "id": post.id,
            "titulo": post.titulo,
            "descricao": post.descricao,
            "autor": "Anônimo" if post.anonimo else post.usuario.nome,
            "categoria": post.disciplina.nome if post.disciplina else "Geral",
            "criado_em": post.criado_em,
            "tags": [tag.nome for tag in post.tags],
            "curtidas": len(post.curtidas),
            "respostas": len(post.respostas),
            "respondida": len(post.respostas) > 0,
        }
        for post in posts
    ]


@router_duvidas.get("/disciplinas", response_model=List[DisciplinaResponse])
def listar_disciplinas(session: Session = Depends(get_db)):
    return session.query(Disciplina).order_by(Disciplina.id).all()
