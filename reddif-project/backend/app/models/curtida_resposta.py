from sqlalchemy import Integer, Column, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timezone

class CurtidaResposta(Base):
    __tablename__ = "curtidas_resposta"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    resposta_id = Column(Integer, ForeignKey("respostas.id", ondelete="CASCADE"), nullable=False)
    criado_em = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    usuario = relationship("Usuario", back_populates="curtidas_resposta")
    resposta = relationship("Resposta", back_populates="curtidas")