<?php

namespace App\DTO\Admin;

use App\DTO\BaseDTO;

class GameTypeSaveDTO implements BaseDTO
{

    public function __construct(
        public string $name,
        public ?string $slug,
        public ?string $cover_image
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            name: $data['name'],
            slug: $data['slug'] ?? null,
            cover_image: $data['cover_image'] ?? null
        );
    }
}
