from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.duvida import Post
from app.models.resposta import Resposta
from app.models.curtida_post import CurtidaPost
from app.models.tag import Tag
from app.schemas.post import PostCreateSchema, RespostaCreateSchema
from sqlalchemy.exc import SQLAlchemyError


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


async def curtida_post(post_id: int, usuario_id: int, session: Session):
    post = session.query(Post).filter(Post.id == post_id).first()
    
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post não encontrado.")
    
    try:
        curtida_existente = session.query(CurtidaPost).filter(CurtidaPost.post_id == post_id, CurtidaPost.usuario_id == usuario_id).first()
        
        if curtida_existente:
            session.delete(curtida_existente)
            session.commit()
            raise HTTPException(status_code=status.HTTP_200_OK, detail="Curtida removida com sucesso.")
        
        nova_curtida = CurtidaPost(post_id=post_id, usuario_id=usuario_id)
        session.add(nova_curtida)
        session.commit()
        
        return {"detail": "Post curtido com sucesso."}
    
    except SQLAlchemyError as e:
        # Se der qualquer erro de banco de dados (ex: tabela travada, coluna errada)
        session.rollback() # Desfaz qualquer alteração para não quebrar o banco
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro interno no banco de dados ao processar a curtida. {str(e)}"
        )