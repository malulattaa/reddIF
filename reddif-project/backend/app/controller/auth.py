from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def obter_usuario_logado(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Usuario:
    credencial_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido ou expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        usuario_id: int = payload.get("sub")
        if usuario_id is None:
            raise credencial_exception
    except JWTError:
        raise credencial_exception

    usuario = db.query(Usuario).filter(Usuario.id == int(usuario_id)).first()
    if usuario is None:
        raise credencial_exception

    return usuario