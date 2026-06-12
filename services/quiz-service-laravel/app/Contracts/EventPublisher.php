<?php

namespace App\Contracts;

interface EventPublisher
{
    public function publish(
        string $exchange,
        string $routingKey,
        array $payload
    ): void;
}
