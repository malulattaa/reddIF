from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, SessionLocal
from app.routers.auth import router_auth
from app.routers.duvidas import router_duvidas

from app.models import usuario, duvida, resposta, tag, disciplina, curtida_post, curtida_resposta, conquista, usuario_conquista
from app.models.disciplina import Disciplina
from app.models.usuario import Usuario, CursoUsuario
from app.models.duvida import Post
from app.models.tag import Tag

Base.metadata.create_all(bind=engine)

DISCIPLINAS_INICIAIS = [
    "Banco de Dados",
    "Algoritmos e Lógica",
    "Desenvolvimento Web",
    "Engenharia de Software",
    "Redes de Computadores",
    "Sistemas Operacionais",
    "Programação Orientada a Objetos",
    "Estrutura de Dados",
]

POSTS_SEED = [
    {
        "titulo": "Como implementar autenticação JWT em Node.js?",
        "descricao": "Estou desenvolvendo uma API REST e preciso implementar autenticação com JWT. Alguém pode me ajudar com um exemplo prático de como gerar e validar tokens?",
        "disciplina": "Desenvolvimento Web",
        "tags": ["Node.js", "JWT", "Segurança"],
        "anonimo": False,
    },
    {
        "titulo": "Dúvida sobre normalização de banco de dados",
        "descricao": "Estou com dificuldade para entender quando usar 2FN e 3FN. Alguém pode explicar a diferença com exemplos práticos do dia a dia?",
        "disciplina": "Banco de Dados",
        "tags": ["SQL", "Normalização", "Modelagem"],
        "anonimo": True,
    },
    {
        "titulo": "Complexidade de algoritmos de ordenação",
        "descricao": "Qual a diferença prática entre QuickSort e MergeSort em termos de desempenho? Quando devo escolher um sobre o outro?",
        "disciplina": "Algoritmos e Lógica",
        "tags": ["Algoritmos", "Ordenação", "Complexidade"],
        "anonimo": False,
    },
    {
        "titulo": "Como usar React Context API vs Redux?",
        "descricao": "Para um projeto de médio porte, vale a pena usar Redux ou a Context API do React já é suficiente para gerenciar estado global?",
        "disciplina": "Desenvolvimento Web",
        "tags": ["React", "Redux", "Estado"],
        "anonimo": False,
    },
]


def seed_disciplinas():
    db = SessionLocal()
    try:
        if db.query(Disciplina).count() == 0:
            for nome in DISCIPLINAS_INICIAIS:
                db.add(Disciplina(nome=nome))
            db.commit()
    finally:
        db.close()


def seed_posts():
    db = SessionLocal()
    try:
        if db.query(Post).count() > 0:
            return

        usuario_seed = db.query(Usuario).filter(Usuario.email == "seed@reddif.ifms.edu.br").first()
        if not usuario_seed:
            usuario_seed = Usuario(
                nome="Comunidade ReddIF",
                email="seed@reddif.ifms.edu.br",
                curso=CursoUsuario.ads,
            )
            usuario_seed.hash_senha("seed_password_123")
            db.add(usuario_seed)
            db.flush()

        for dados in POSTS_SEED:
            disc = db.query(Disciplina).filter(Disciplina.nome == dados["disciplina"]).first()
            if not disc:
                continue

            post = Post(
                titulo=dados["titulo"],
                descricao=dados["descricao"],
                anonimo=dados["anonimo"],
                usuario_id=usuario_seed.id,
                disciplina_id=disc.id,
            )
            db.add(post)
            db.flush()

            for nome_tag in dados["tags"]:
                tag_obj = db.query(Tag).filter(Tag.nome == nome_tag).first()
                if not tag_obj:
                    tag_obj = Tag(nome=nome_tag)
                    db.add(tag_obj)
                    db.flush()
                post.tags.append(tag_obj)

        db.commit()
    finally:
        db.close()


seed_disciplinas()
seed_posts()

app = FastAPI(
    title="ReddIF API",
    description="API da plataforma colaborativa de monitoria do IFMS",
    version="1.0.0"
)

app.include_router(router_auth)
app.include_router(router_duvidas)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ReddIF API funcionando!"}
