<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\QuizAttemptService;
use App\Models\QuizAttempt;

class QuizAttemptController extends Controller
{
    public function __construct(private readonly QuizAttemptService $quizAttemptService) {}

    public function quizAttempts(int $quizId)
    {
        return $this->quizAttemptService->quizAttempts($quizId);
    }

    public function show(int $attemptId)
    {
        return $this->quizAttemptService->show($attemptId);
    }
}
