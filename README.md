# ReddIF 📚

Plataforma colaborativa de monitoria estudantil desenvolvida por alunos do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas** do IFMS — campus Três Lagoas.

---

## O que é o ReddIF?

O ReddIF conecta estudantes que têm dúvidas com estudantes que podem ajudar. A ideia é simples: nem sempre dá pra comparecer à monitoria presencial, os horários não encaixam, os monitores oficiais são poucos — e muita gente ainda tem receio de expor dúvidas publicamente.

A plataforma resolve isso oferecendo um espaço digital, flexível e seguro para troca de conhecimento entre a própria comunidade acadêmica.

---

## Principais funcionalidades

- 🔍 **Busca por monitores** — encontre colegas que dominam a matéria que você precisa
- 💬 **Comunicação integrada** — troque mensagens diretamente pela plataforma
- 🎭 **Modo anônimo** — faça perguntas sem se identificar, se preferir
- 🛡️ **Moderação de conteúdo** — ambiente controlado para garantir interações respeitosas e dentro do contexto educacional
- 📅 **Flexibilidade de horários** — sem depender de horários fixos de atendimento

---

## Tecnologias

O desenvolvimento da plataforma adota uma arquitetura moderna baseada na separação entre camadas de apresentação e processamento. No back-end, utiliza-se a linguagem **Python** em conjunto com o framework **FastAPI**, escolhido por sua alta performance, suporte nativo a operações assíncronas e geração automática de documentação via OpenAPI. A persistência dos dados é gerenciada por meio de banco de dados relacional com linguagem **SQL**, garantindo integridade e consistência das informações armazenadas.

No front-end, a interface é construída utilizando as bibliotecas **React** e **Vue.js**, ambas baseadas em componentes reutilizáveis e amplamente adotadas no mercado, favorecendo a manutenibilidade e a escalabilidade da aplicação.

### Resumo da stack

#### Back-end
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)

#### Front-end
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)

---

## 📂 Estrutura do repositório

O projeto adota uma arquitetura de **Monorepo**, separando claramente as responsabilidades entre a API e a interface de usuário.

```
reddif/
│
├── backend/                  # Módulo da API (Python + FastAPI)
│   ├── app/
│   │   ├── main.py           # Ponto de entrada e inicialização do FastAPI
│   │   ├── config.py         # Gerenciamento de variáveis de ambiente (.env)
│   │   ├── database.py       # Configuração e sessão do banco de dados
│   │   │
│   │   ├── core/             # Configurações de segurança (hashing, JWT)
│   │   │   └── security.py
│   │   │
│   │   ├── models/           # Entidades do banco de dados (ORM)
│   │   │   ├── usuario.py
│   │   │   ├── disciplina.py
│   │   │   └── duvida.py
│   │   │
│   │   ├── schemas/          # Contratos de validação de dados (Pydantic)
│   │   │   ├── usuario.py
│   │   │   └── duvida.py
│   │   │
│   │   └── routers/          # Controladores e endpoints da API
│   │       ├── auth.py       # Rotas de login/cadastro
│   │       ├── usuarios.py   # Gestão de perfis e anonimato
│   │       └── duvidas.py    # Rotas de postagem e monitoria
│   │
│   └── requirements.txt      # Dependências do back-end
│
├── frontend/                 # Módulo da interface (React)
│   ├── src/
│   │   ├── assets/           # Estilos globais e recursos estáticos
│   │   ├── components/       # Componentes de UI reutilizáveis
│   │   ├── pages/            # Telas da aplicação
│   │   ├── App.jsx           # Componente raiz
│   │   └── main.jsx          # Ponto de inicialização
│   │
│   └── package.json          # Dependências do front-end
│
└── README.md
```

---

## Equipe

| Nome | Área |
|---|---|
| Ana Clara Miguel dos Santos | Front-end |
| Ana Laura Martins | Front-end |
| Gabriela Santos Tucunduva | Back-end |
| Leonardo Franco | Back-end |
| Luísa de Matos | Front-end |
| Maria Luisa Ribeiro Martins Latta | Back-end |
| Vinicius Henrique Lima de Souza | Back-end |

---

*Instituto Federal de Educação, Ciência e Tecnologia do Mato Grosso do Sul — IFMS, Três Lagoas, 2026*
