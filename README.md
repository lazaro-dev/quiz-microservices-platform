# Quiz Microservices Platform

Projeto de estudo focado em arquitetura de microserviços.

## Tecnologias

* Go
* Laravel
* Spring Boot
* Node.js
* Python
* Redis
* RabbitMQ
* PostgreSQL
* Docker
* Nginx

## Arquitetura

Frontend → API Gateway → Microservices

## Infraestrutura

* Redis (cache)
* RabbitMQ (mensageria)
* PostgreSQL (database)
* Nginx (API Gateway)


#Start projeto
--Lembrete para adicionar ao final
Caso erro de arquivo .sh não encontrado ao executar o docker-compose, trocar CRLF por LF do arquivo

APP_ENV=testing php artisan test
 
 
#add futuramente melhor explanado

Arquitetura de Micro Frontends utilizando Module Federation.

Shell host em Angular.

Aplicação do jogador em Angular.

Aplicação administrativa em Vue 3.

Integração transparente entre frameworks.

Backend baseado em microserviços (Go, Spring Boot, Laravel e Node.js).


#Shell (Angular Host)

Responsabilidades:

Carregar os MFEs
Controlar autenticação
Redirecionamentos
Guards de rota
Layout base (se necessário)

Não contém regras de negócio de Quiz.

├── login
├── register
├── forgot-password
└── federation config


#Player (Angular Remote)

Responsável pela experiência do jogador.

/
├── Home
├── Buscar Quiz
├── Categorias
├── Ranking
├── Perfil Público
├── Detalhe do Quiz
└── Sobre

Áreas protegidas dentro do Player
/profile
/play/:slug
/favorites
/history
/my-quizzes
/create-quiz
/edit-quiz/:id


#Admin (Vue Remote)

Responsável pela gestão da plataforma.

/admin
├── Dashboard
├── Users
├── Quizzes
├── Categories
├── Reports
└── Settings

#Comunicação
Autenticação

Fluxo:

Player/Admin
      │
      ▼
API Gateway
      │
      ▼
Auth Service



Tailwind
├── Layout
├── Espaçamento
├── Grid
├── Flex
├── Responsividade
└── Animações simples

SCSS Variables
├── Cores
├── Radius
├── Sombras
├── Temas
└── Tokens visuais