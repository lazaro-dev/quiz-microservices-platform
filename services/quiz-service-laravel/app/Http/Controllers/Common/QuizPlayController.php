<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Services\Common\PlayQuizService;

class QuizPlayController extends Controller
{
    public function __construct(private PlayQuizService $playQuizService) {}

    public function play(int $quizId)
    {
        return $this->playQuizService->play($quizId);
    }
}
