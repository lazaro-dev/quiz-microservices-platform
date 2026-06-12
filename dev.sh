#!/bin/bash

set -e

if [ "$1" = "-t" ]; then
   ./infrastructure/scripts/test-all.sh

elif [ "$1" = "-u" ]; then
   docker compose -f docker-compose.dev.yml up -d --remove-orphans

elif [ "$1" = "-d" ]; then
   docker compose -f docker-compose.dev.yml down

elif [ "$1" = "-dv" ]; then
   docker compose -f docker-compose.dev.yml down -v

elif [ "$1" = "-b" ]; then
   docker compose -f docker-compose.dev.yml build "$2"

elif [ "$1" = "-bnc" ]; then
   docker compose -f docker-compose.dev.yml build --no-cache "$2"

elif [ "$1" = "-logs" ]; then
   docker compose -f docker-compose.dev.yml logs -f "$2"

else
   echo "Uso:"
   echo "  -t    roda testes"
   echo "  -u    sobe containers"
   echo "  -d    down"
   echo "  -dv   down com volumes"
   echo "  -b    build service"
   echo "  -bnc  build sem cache"
fi