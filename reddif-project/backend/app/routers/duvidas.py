from database import get_db
from fastapi import APIRouter, Depends, status
from schemas.duvida import PostResponseSchema, PostCreateSchema
from sqlalchemy.orm import Session
from routers.controllerPost import criarPost


routerPost = APIRouter()

@routerPost.post("/post", resposta = PostResponseSchema)
async def criar_post(dados: PostCreateSchema, session: Session = Depends(get_db)):
    id_usuario_logado = 5
    
    return await criarPost(dados, id_usuario_logado, session)