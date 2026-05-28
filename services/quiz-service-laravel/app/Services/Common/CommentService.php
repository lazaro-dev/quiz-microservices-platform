<?php

namespace App\Services\Common;

use App\DTO\Common\CommentStoreDTO;
use App\Models\Comment;

class CommentService
{
    public function index(int $quizId)
    {
        return Comment::with('user')
            ->where('quiz_id', $quizId)
            ->latest()
            ->get();
    }

    public function store(CommentStoreDTO $dto)
    {
        return Comment::create([
            'user_id' => $dto->user_id,
            'quiz_id' => $dto->quiz_id,
            'content' => $dto->content
        ]);
    }
}
