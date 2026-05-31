<<<<<<< Updated upstream
# ReddIF 📚

Plataforma colaborativa de monitoria estudantil desenvolvida por alunos do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas** do IFMS — campus Três Lagoas.

---

## O que é o ReddIF?

O ReddIF conecta estudantes que têm dúvidas com estudantes que podem ajudar. A ideia é simples: nem sempre dá pra comparecer à monitoria presencial, os horários não encaixam, os monitores oficiais são poucos — e muita gente ainda tem receio de expor dúvidas publicamente.

A plataforma resolve isso oferecendo um espaço digital, flexível e seguro para troca de conhecimento entre a própria comunidade acadêmica.

---

## Principais funcionalidades

- **Busca por monitores** — encontre colegas que dominam a matéria que você precisa
- **Comunicação integrada** — troque mensagens diretamente pela plataforma
- **Modo anônimo** — faça perguntas sem se identificar, se preferir
- **Moderação de conteúdo** — ambiente controlado para garantir interações respeitosas e dentro do contexto educacional
- **Flexibilidade de horários** — sem depender de horários fixos de atendimento

---

## Tecnologias

## Tecnologias Utilizadas

- **Back-end:** Python e FastAPI
- **Front-end:** React
- **Banco de Dados:** SQL (relacional)
- **Containerização:** Docker

## Arquitetura

A plataforma adota uma arquitetura baseada na separação entre front-end e back-end. O processamento das requisições e as regras de negócio são gerenciados pelo FastAPI, enquanto a interface é desenvolvida em React. Os dados são armazenados em um banco de dados relacional e os serviços são executados em contêineres Docker para garantir consistência entre os ambientes de desenvolvimento e produção.

---

## 📂 Estrutura do Repositório

O projeto adota uma arquitetura de **Monorepo**, separando claramente as responsabilidades entre a API e a interface de usuário, garantindo independência no desenvolvimento e facilidade na orquestração dos contêineres.

```text
reddif/
│
├── backend/                  # Módulo da API (Python + FastAPI)
│   ├── app/
│   │   ├── main.py           # Ponto de entrada e inicialização do FastAPI
│   │   ├── config.py         # Gerenciamento de variáveis de ambiente (.env)
│   │   ├── database.py       # Configuração e sessão do Banco de Dados
│   │   │
│   │   ├── core/             # Configurações de segurança (hashing, JWT)
│   │   │   └── security.py
│   │   │
│   │   ├── models/           # Entidades do Banco de Dados (ORM baseadas na UML)
│   │   │   ├── usuario.py
│   │   │   ├── disciplina.py
│   │   │   └── duvida.py
│   │   │
│   │   ├── schemas/          # Contratos de validação de dados (Pydantic)
│   │   │   ├── usuario.py
│   │   │   └── duvida.py
│   │   │
│   │   └── routers/          # Controladores e Endpoints da API
│   │       ├── auth.py       # Rotas de Login/Cadastro
│   │       ├── usuarios.py   # Gestão de perfis e anonimato
│   │       └── duvidas.py    # Rotas de postagem e monitoria
│   │
│   ├── Dockerfile            # Imagem Docker do ambiente Python
│   └── requirements.txt      # Dependências do Backend
│
├── frontend/                 # Módulo da Interface (Vue.js)
│   ├── src/
│   │   ├── assets/           # Estilos globais e recursos estáticos (imagens, ícones)
│   │   ├── components/       # Componentes de UI reutilizáveis (ex: Navbar, Card)
│   │   │
│   │   ├── router/           # Configuração de navegação (Vue Router)
│   │   │   └── index.js
│   │   │
│   │   ├── views/            # Telas da aplicação (Páginas principais)
│   │   │   ├── Login.vue
│   │   │   ├── Feed.vue
│   │   │   └── PostarDuvida.vue
│   │   │
│   │   ├── App.vue           # Componente raiz da interface
│   │   └── main.js           # Ponto de inicialização do Vue
│   │
│   ├── Dockerfile            # Imagem Docker do ambiente Node/Vue
│   └── package.json          # Dependências do Frontend
│
└── README.md                 # Documentação principal

----

## Equipe

| Nome |
|---|
| Ana Clara Miguel dos Santos |
| Ana Laura Martins |
| Gabriela Santos Tucunduva |
| Leonardo Franco |
| Luísa de Matos |
| Maria Luisa Ribeiro Martins Latta |
| Vinicius Henrique Lima de Souza |

---

*Instituto Federal de Educação, Ciência e Tecnologia do Mato Grosso do Sul - IFMS; Três Lagoas, 2026*
=======
# reddIF
ReddIF é uma plataforma colaborativa de monitoria acadêmica que conecta estudantes para compartilhamento de conhecimento de forma acessível, segura e flexível. O sistema permite interação entre alunos, suporte em disciplinas, anonimato opcional e mecanismos de moderação para fortalecer a aprendizagem colaborativa..


