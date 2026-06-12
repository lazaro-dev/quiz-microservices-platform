<?php

namespace App\DTO\Common;

use App\DTO\BaseDTO;

class QuizAttemptDTO implements BaseDTO
{
    public function __construct(
        public int $quiz_id,
        public int $user_id,
        public string $username,
        public ?string $avatar,
        public int $time_seconds,
        public array $answers
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            $data['quiz_id'],
            $data['user_id'],
            $data['username'],
            $data['avatar'] ?? null,
            $data['time_seconds'],
            $data['answers']
        );
    }
}
