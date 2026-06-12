<?php

namespace App\Infrastructure\RabbitMQ;

final class RabbitMQTopology
{
    public const QUIZ_EVENTS_EXCHANGE = 'quiz.events';

    public const QUIZ_FINISHED_ROUTING_KEY = 'quiz.finished';
}
