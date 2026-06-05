from sqlalchemy import Integer, Column, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timezone

class UsuarioConquista(Base):
    __tablename__ = "usuario_conquistas"
    
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), primary_key=True)
    conquista_id = Column(Integer, ForeignKey("conquistas.id", ondelete="CASCADE"), primary_key=True)
    conquistado_em = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    usuario = relationship("Usuario", back_populates="conquistas")
    conquista = relationship("Conquista", back_populates="usuarios")