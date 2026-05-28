<?php

namespace App\DTO\Common;

use App\DTO\BaseDTO;

class RatingDTO implements BaseDTO
{
    public function __construct(
        public int $user_id,
        public int $quiz_id,
        public int $rating
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            user_id: $data['user_id'],
            quiz_id: $data['quiz_id'],
            rating: $data['rating']
        );
    }
}
