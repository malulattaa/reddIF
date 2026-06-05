from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import relationship
from app.database import Base

class Conquista(Base):
    __tablename__ = "conquistas"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False, unique=True)
    descricao = Column(String, nullable=False)
    icone = Column(String, nullable=False)
    usuarios = relationship("UsuarioConquista", back_populates="conquista")