<?php

namespace App\Http\Controllers\Common;

use App\DTO\Common\CommentStoreDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Common\Comment\StoreCommentRequest;
use App\Models\Comment;
use App\Services\Common\CommentService;
use App\Support\AuthUser;

class CommentController extends Controller
{
    public function __construct(private readonly CommentService $commentService) {}

    public function index(int $quizId)
    {
        return $this->commentService->index($quizId);
    }

    public function store(StoreCommentRequest $request, int $quizId)
    {
        return $this->commentService->store(CommentStoreDTO::fromArray(
            [
                "user_id" => AuthUser::id(),
                "username" => AuthUser::username(),
                "quiz_id" => $quizId,
                ...$request->validated()
            ]
        ));
    }
}
