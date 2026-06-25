🧩 Quiz Microservices Platform

Plataforma de quizzes construída como projeto de estudo focado em arquitetura de microserviços, comunicação assíncrona e sistemas distribuídos.

O objetivo do projeto é explorar, na prática, padrões modernos de backend, integração entre serviços e escalabilidade.

🧠 Arquitetura

O sistema é composto por múltiplos serviços independentes, comunicando-se através de HTTP, mensageria e cache distribuído.

---

## ⚙️ Serviços

### 🔐 Auth Service (Go)
- Autenticação JWT
- Validação de token
- Integração com User Service

### 👤 User Service (Spring Boot)
- Gestão de usuários
- Persistência no PostgreSQL
- Camada de domínio independente

### 🧩 Quiz Service (Laravel)
- Criação e gerenciamento de quizzes
- Estrutura de perguntas e respostas
- Regras de negócio da aplicação

### ⚡ Realtime Service (Node.js)
- WebSockets
- Ranking de pontuações
- Comunicação em tempo real
- Integração com Redis e RabbitMQ

### 🌐 API Gateway (Nginx)
- Roteamento de requisições
- Ponto único de entrada do sistema
- Proxy reverso para microserviços

---

## 🧱 Infraestrutura

- 🐘 PostgreSQL → banco principal  
- 🧠 Redis → cache e comunicação rápida  
- 📩 RabbitMQ → mensageria assíncrona  
- 🌐 Nginx → API Gateway  
- 🧪 Adminer → interface para banco de dados (Apenas em desenvolvimento)

---

## 🐳 Como executar o projeto

### Pré-requisitos
- Docker
- Docker Compose

### Subir o ambiente

## 🚀 Inicialização do ambiente

### 1. Subir infraestrutura e backends

```bash
./dev.sh -u
```

### 2. Iniciar o Shell Frontend

```bash
cd apps/shell-angular
npm install
npm start
```

### 3. Iniciar o Player Frontend

```bash
cd apps/player-angular
npm install
npm start
```

### 4. Acessar a aplicação

```text
http://localhost:4200
```


> O Shell carrega dinamicamente o Player através de Module Federation.


### Derrubar os containers

```bash
./dev.sh -d
```

### Derrubar os containers e remover volumes

```bash
./dev.sh -dv
```

### Executar testes

```bash
./dev.sh -t
```

### Build de um serviço específico

```bash
./dev.sh -b auth-service
```

### Build sem cache

```bash
./dev.sh -bnc auth-service
```


### 🖥️ Shell Frontend (Angular)

- Aplicação host dos Micro Frontends
- Responsável pelo roteamento principal
- Carregamento dinâmico dos módulos remotos
- Autenticação

### 🎮 Player Frontend (Angular)

- Micro Frontend independente
- Responsável pela experiência de jogo/quizzes
- Integrado ao Shell via Module Federation

### 🔐 Admin (Vue)

- Micro Frontend independente
- Responsável pelo gerenciamento de quizzes
- Integrado ao Shell via Module Federation


| Serviço | Tecnologia |
|----------|------------|
| Auth Service | Go |
| User Service | Spring Boot |
| Quiz Service | Laravel |
| Realtime Service | Node.js |
| Gateway | Nginx |
| Cache | Redis |
| Mensageria | RabbitMQ |
| Banco | PostgreSQL |

## 🧑‍💻 Stack

### Frontend
- Angular/Vue
- Module Federation
- Micro Frontends

### Backend
- Go
- Spring Boot
- Laravel
- Node.js

### Infraestrutura
- Docker
- Nginx
- RabbitMQ
- Redis
- PostgreSQL

Este projeto foi construído como laboratório para estudo de arquitetura de software distribuído, com foco em aprendizado prático e exploração de tecnologias reais usadas em sistemas escaláveis.

⭐ Se gostou

Se quiser acompanhar a evolução, estou documentando o projeto e posso compartilhar decisões de arquitetura, desafios e melhorias ao longo do desenvolvimento.

🔗 Repositório

https://github.com/lazaro-dev/quiz-microservices-platform