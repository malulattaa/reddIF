from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.duvida import Post
from app.models.resposta import Resposta
from app.models.tag import Tag
from app.schemas.post import PostCreateSchema, RespostaCreateSchema


def criar_post_controller(dados: PostCreateSchema, usuario_id: int, session: Session):
    try:
        tags_obj = []
        for nome_tag in dados.tags:
            tag = session.query(Tag).filter(Tag.nome == nome_tag).first()
            if not tag:
                tag = Tag(nome=nome_tag)
                session.add(tag)
            tags_obj.append(tag)

        novo_post = Post(
            titulo=dados.titulo,
            descricao=dados.descricao,
            disciplina_id=dados.disciplina_id,
            anonimo=dados.anonimo,
            tags=tags_obj,
            usuario_id=usuario_id,
        )
        session.add(novo_post)
        session.commit()
        session.refresh(novo_post)
        return novo_post

    except IntegrityError:
        session.rollback()
        raise HTTPException(400, "Verifique se a disciplina ou usuário existem.")

    except Exception as e:
        session.rollback()
        raise HTTPException(500, f"Erro interno: {str(e)}")


def obter_post_controller(post_id: int, session: Session):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post não encontrado")
    return post


def criar_resposta_controller(post_id: int, dados: RespostaCreateSchema, usuario_id: int, session: Session):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post não encontrado")
    if post.resolvido:
        raise HTTPException(400, "Post já resolvido")

    try:
        resposta = Resposta(
            conteudo=dados.conteudo,
            post_id=post_id,
            usuario_id=usuario_id,
        )
        session.add(resposta)
        session.commit()
        session.refresh(resposta)
        return resposta

    except Exception as e:
        session.rollback()
        raise HTTPException(500, f"Erro interno: {str(e)}")


def marcar_solucao_controller(post_id: int, resposta_id: int, usuario_id: int, session: Session):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post não encontrado")
    if post.usuario_id != usuario_id:
        raise HTTPException(403, "Só o autor pode marcar a solução")

    resposta = session.get(Resposta, resposta_id)
    if not resposta or resposta.post_id != post_id:
        raise HTTPException(404, "Resposta não encontrada")

    for r in post.respostas:
        r.solucao = False
    resposta.solucao = True
    post.resolvido = True
    session.commit()
    return {"ok": True}