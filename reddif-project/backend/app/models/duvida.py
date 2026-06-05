from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, String, Column, Boolean, DateTime, ForeignKey
from datetime import timezone, datetime
from app.models.tag import post_tag


class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    anonimo = Column(Boolean, default=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    disciplina_id = Column(Integer, ForeignKey("disciplinas.id", ondelete="CASCADE"), nullable=False)
    criado_em = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    
    usuario = relationship("Usuario", back_populates="posts")
    disciplina = relationship("Disciplina", back_populates="posts")
    respostas = relationship("Resposta", back_populates="post", cascade="all, delete-orphan")
    tags = relationship("Tag", secondary=post_tag, back_populates="posts")