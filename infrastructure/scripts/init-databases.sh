#!/bin/sh
set -e

echo "Criando bancos caso necessário..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<-EOSQL

SELECT 'CREATE DATABASE user_service'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'user_service')\gexec

SELECT 'CREATE DATABASE quiz'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'quiz')\gexec
EOSQL

echo "Bancos criados com sucesso!"