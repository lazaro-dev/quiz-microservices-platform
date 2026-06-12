<?php

namespace App\Infrastructure\RabbitMQ;

use App\Contracts\EventPublisher;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQPublisher implements EventPublisher
{
    public function __construct(private readonly RabbitMQClient $client) {}

    public function publish(string $exchange, string $routingKey, array $payload): void
    {
        $message = new AMQPMessage(
            json_encode($payload),
            [
                'content_type' => 'application/json',
                'delivery_mode' => 2,
            ]
        );

        $this->client
            ->getChannel()
            ->basic_publish(
                $message,
                $exchange,
                $routingKey
            );
    }
}
