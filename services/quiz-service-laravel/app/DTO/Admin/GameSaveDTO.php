<?php

namespace App\DTO\Admin;

use App\DTO\BaseDTO;

class GameSaveDTO implements BaseDTO
{

    public function __construct(
        public int $game_type_id,
        public string $name,
        public ?string $slug,
        public ?string $description,
        public ?string $cover_image
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            game_type_id: $data['game_type_id'],
            name: $data['name'],
            slug: $data['slug'] ?? null,
            description: $data['description'] ?? null,
            cover_image: $data['cover_image'] ?? null
        );
    }
}
