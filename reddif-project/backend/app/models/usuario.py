from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class TipoUsuario(enum.Enum):
    aluno = "aluno"
    monitor = "monitor"
    professor = "professor"
    admin = "admin"
    
class CursoUsuario(enum.Enum):
    eletrotecnica = "Técnico em eletrotécnica"
    informatica = "Técnico em Informática"
    ads = "Análise e Desenvolvimento de Sistemas"
    engComputacao = "Engenharia da Computação"
    engAutomacao = "Engenharia de Controle e Automação"
    adm = "Administração"
    pos = "Pós Graduação"

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    senha = Column(String, nullable=False)
    curso = Column(Enum(CursoUsuario), nullable=False)
    tipo = Column(Enum(TipoUsuario), default=TipoUsuario.aluno, nullable=False)
    pontos = Column(Integer, default=0)
    criado_em = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="usuario")
    respostas = relationship("Resposta", back_populates="usuario")
    conquistas = relationship("UsuarioConquista", back_populates="usuario")
    curtidas_post = relationship("CurtidaPost", back_populates="usuario")
    curtidas_resposta = relationship("CurtidaResposta", back_populates="usuario")
    
    def verificar_senha(self, senha_pura: str):
        senha_pura = senha_pura.encode("utf-8")[:72].decode("utf-8", errors="ignore")
        return pwd_context.verify(senha_pura, self.senha)

    def hash_senha(self, senha_pura: str):
        senha_pura = senha_pura.encode("utf-8")[:72].decode("utf-8", errors="ignore")
        self.senha = pwd_context.hash(senha_pura)