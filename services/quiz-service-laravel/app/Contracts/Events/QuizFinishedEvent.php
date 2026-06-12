<?php

namespace App\Contracts\Events;

final readonly class QuizFinishedEvent
{
    public function __construct(
        public string $eventId,
        public int $quizId,
        public int $userId,
        public string $username,
        public ?string $avatar,
        public int $score,
        public string $completedAt,
    ) {}

    public function toArray(): array
    {
        return [
            'quizId' => $this->quizId,
            'userId' => $this->userId,
            'username' => $this->username,
            'avatar' => $this->avatar,
            'score' => $this->score,
            'completedAt' => $this->completedAt,
        ];
    }
}
