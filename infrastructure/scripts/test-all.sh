#!/bin/sh

set -e

echo "Esperando por banco de dados..."

until docker compose exec -T postgres pg_isready -U admin; do
  sleep 2
done

echo "Executando Auth testes..."
docker compose exec auth-service go test -v ./internal/...

echo "Executando User testes..."
docker compose exec user-service mvn test

echo "Executando Quiz testes..."
docker compose exec quiz-service sh -c "APP_ENV=testing php artisan test"

echo "Executando Realtime testes..."
docker compose exec realtime-service npm run test

echo "Todos os testes foram executados com sucesso!"