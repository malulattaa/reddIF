from sqlalchemy import Integer, Column, Boolean, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timezone

class Resposta(Base):
    __tablename__ = "respostas"
    
    id = Column(Integer, primary_key=True, index=True)
    conteudo = Column(String, nullable=False)
    verificada = Column(Boolean, default=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    criado_em = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    usuario = relationship("Usuario", back_populates="respostas")
    post = relationship("Post", back_populates="respostas")