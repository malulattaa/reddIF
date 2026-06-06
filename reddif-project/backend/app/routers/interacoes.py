from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from app.routers.auth import obter_usuario_logado
from app.schemas.curtida import CurtidaToggleRequest
from app.controller.post import curtida_post

routerInteracoes = APIRouter(prefix="/interacoes")

@routerInteracoes.post("/curtir")
async def curtir_descurtir_post(dados: CurtidaToggleRequest, usuario_atual: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    return await curtida_post(post_id= dados.post_id, usuario_id= usuario_atual.id, session= session)

