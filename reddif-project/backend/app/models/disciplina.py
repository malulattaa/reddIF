from app.database import Base
from sqlalchemy import Integer, String, Column
from sqlalchemy.orm import relationship

class Disciplina(Base):
    __tablename__ = "disciplinas"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False, index=True)
    
    
    posts = relationship("Post", back_populates="disciplina")