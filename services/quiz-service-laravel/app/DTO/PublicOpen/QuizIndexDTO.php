<?php

namespace App\DTO\PublicOpen;

use App\DTO\BaseDTO;

class QuizIndexDTO implements BaseDTO
{
    public function __construct(
        public ?int $game_id,
        public ?string $difficulty,
        public ?string $search,
        public ?int $page,
        public ?int $per_page,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            game_id: $data['game_id'] ?? null,
            difficulty: $data['difficulty'] ?? null,
            search: $data['search'] ?? null,
            page: $data['page'] ?? 1,
            per_page: $data['per_page'] ?? 10
        );
    }
}
