# 🧩 Modelo ER - Quiz Service

## Entidades

### users
- id
- name
- email

---

### game_types
- id
- name
- slug

---

### games
- id
- game_type_id (FK)
- name
- slug
- cover_image

---

### quizzes
- id
- game_id (FK)
- title
- description
- cover_image
- difficulty
- created_by (FK user)
- is_published
- avg_rating
- total_ratings
- created_at

---

### questions
- id
- quiz_id (FK)
- question_text
- image_url (nullable)
- order

---

### options
- id
- question_id (FK)
- option_text
- is_correct

---

### quiz_attempts
- id
- user_id (FK)
- quiz_id (FK)
- score
- total_questions
- correct_answers
- time_seconds
- created_at

---

### attempt_answers
- id
- quiz_attempt_id (FK)
- question_id (FK)
- selected_option_id (FK)
- is_correct

---

### ratings
- id
- user_id (FK)
- quiz_id (FK)
- rating
- created_at

---

### comments
- id
- user_id (FK)
- quiz_id (FK)
- content
- created_at

---

## 🔗 Relacionamentos

- game_types 1:N games
- games 1:N quizzes
- quizzes 1:N questions
- questions 1:N options

- users 1:N quiz_attempts
- quizzes 1:N quiz_attempts

- quiz_attempts 1:N attempt_answers

- users 1:N ratings
- quizzes 1:N ratings

- users 1:N comments
- quizzes 1:N comments