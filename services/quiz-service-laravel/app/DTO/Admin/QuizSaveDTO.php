<?php

namespace App\DTO\Admin;

use App\DTO\BaseDTO;

class QuizSaveDTO implements BaseDTO
{
    public function __construct(
        public int $game_id,
        public string $title,
        public ?string $description,
        public ?string $cover_image,
        public string $difficulty,
        public bool $is_published,
        public array $questions,
        public int $created_by
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            game_id: $data['game_id'],
            title: $data['title'],
            description: $data['description'] ?? null,
            cover_image: $data['cover_image'] ?? null,
            difficulty: $data['difficulty'],
            is_published: $data['is_published'],
            questions: $data['questions'],
            created_by: $data['created_by'],
        );
    }
}
