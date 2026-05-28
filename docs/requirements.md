# 📚 Quiz Service - Requisitos

## 🎯 Objetivo
Sistema de quizzes focado inicialmente em jogos, permitindo que usuários respondam quizzes, acompanhem desempenho e interajam com conteúdo.

---

## 🧱 Estrutura de Conteúdo

Hierarquia:
- Tipo de Jogo (ex: Soulslike, FPS)
- Jogo (ex: Elden Ring, CS2)
- Quiz

---

## 🧩 Funcionalidades

### 👤 Usuários
- Autenticação via JWT
- Participar de quizzes
- Avaliar quizzes
- Comentar em quizzes

---

### 🧠 Quiz
- Título
- Descrição
- Imagem de capa
- Dificuldade (easy, medium, hard)
- Status (publicado ou não)

---

### ❓ Perguntas
- Texto da pergunta
- Ordem
- (Futuro) imagem opcional

---

### 🔘 Respostas
- Múltipla escolha
- Apenas uma correta

---

### 🏁 Execução do Quiz
- Registro de tentativa
- Tempo total (em segundos)
- Pontuação
- Quantidade de acertos

---

### 📊 Histórico
- Usuário pode visualizar:
  - Tentativas anteriores
  - Respostas dadas
  - Onde errou/acertou

---

### ⭐ Avaliação
- Nota de 1 a 5 estrelas
- Média calculada por quiz

---

### 💬 Comentários
- Comentários simples por quiz

---

### 🏆 Ranking
- Baseado em:
  - Pontuação
  - Tempo

---

## 🚀 Funcionalidades Futuras

- Criação de quizzes por usuários
- Moderação de conteúdo
- Imagens por pergunta
- Likes em comentários
- Respostas em thread
- Ranking semanal/global
- Estatísticas avançadas por pergunta