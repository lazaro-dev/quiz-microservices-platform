<?php

namespace App\Services\Admin;

use App\Services\Common\QuizAttemptService as CommonQuizAttemptService;
use App\Models\QuizAttempt;

class QuizAttemptService
{
    public function __construct(private readonly CommonQuizAttemptService $commonQuizAttemptService) {}

    public function quizAttempts(int $quizId)
    {
        return QuizAttempt::query()
            ->with([
                'quiz:id,title',
                'user:id,name'
            ])
            ->where('quiz_id', $quizId)
            ->latest()
            ->paginate();
    }

    public function show(int $attemptId)
    {
        return $this->commonQuizAttemptService->show($attemptId);
    }
}
