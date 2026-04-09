#!/bin/sh
set -e

DB_HOST=${DB_HOST:-postgres}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-admin}

echo "Criando diretórios necessários..."

mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p bootstrap/cache

echo "Instalando dependências se necessário..."

if [ ! -f "/var/www/vendor/autoload.php" ]; then
  echo "Instalando dependências..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
else
  echo "Dependências já instaladas"
fi

echo "Aguardando banco de dados em $DB_HOST:$DB_PORT..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME"; do
  sleep 2
done

# Rodar migrations
echo "Rodando migrations..."
php artisan migrate --force || true

echo "Inicialização concluída"

exec "$@"