# ---------- BUILD STAGE ----------
FROM composer:3 AS builder

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --optimize-autoloader

COPY . .

RUN php artisan config:cache || true
RUN php artisan route:cache || true

# ---------- RUNTIME ----------
FROM php:8.3-fpm-alpine

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libpng-dev

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    bcmath \
    pcntl \
    zip

WORKDIR /var/www

COPY infrastructure/docker/php/php.ini /usr/local/etc/php/php.ini

COPY --from=builder /app .

RUN chown -R www-data:www-data /var/www

USER www-data

CMD ["php-fpm"]