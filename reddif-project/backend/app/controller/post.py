from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.duvida import PostCreateSchema
from app.models.duvida import Post
from sqlalchemy.exc import IntegrityError

def criar_post_controller(dados: PostCreateSchema, id_usuario: int, session: Session):
    try:   
        novo_post = Post(
            titulo = dados.titulo,
            descricao = dados.descricao,
            anonimo = dados.anonimo,
            usuario_id = id_usuario,
            disciplina_id = dados.disciplina_id
        )
        
        session.add(novo_post)
        session.commit()
        session.refresh(novo_post)
        
        return novo_post
    
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=400, detail="Erro de integridade: Verifique se a disciplina ou usuário existem.")
    
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Erro interno no servidor: {str(e)}")