<?php

namespace App\DTO\Common;

use App\DTO\BaseDTO;

class CommentStoreDTO implements BaseDTO
{
    public function __construct(
        public int $quiz_id,
        public int $user_id,
        public string $content
    ) {}

    public static function fromArray(array $data): BaseDTO
    {
        return new self(
            $data['quiz_id'],
            $data['user_id'],
            $data['content']
        );
    }
}
