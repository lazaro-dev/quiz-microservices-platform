<?php

namespace App\Http\Controllers\Common;

use App\DTO\Common\QuizAttemptDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Common\QuizAttempt\StoreQuizAttemptRequest;
use App\Services\Common\QuizAttemptService;
use App\Support\AuthUser;

class QuizAttemptController extends Controller
{
    public function __construct(private readonly QuizAttemptService $quizAttemptService) {}

    public function store(StoreQuizAttemptRequest $request, int $quizId)
    {
        return $this->quizAttemptService->store(
            QuizAttemptDTO::fromArray([
                "user_id" => AuthUser::id(),
                "quiz_id" => $quizId,
                "username" => AuthUser::username(),
                ...$request->validated()
            ])
        );
    }

    public function myAttempts()
    {
        return $this->quizAttemptService->myAttempts();
    }

    public function myQuizAttempts(int $quizId)
    {
        return $this->quizAttemptService->myQuizAttempts($quizId);
    }

    public function show(int $attemptId)
    {
        return $this->quizAttemptService->show($attemptId);
    }
}
