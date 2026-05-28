<?php

namespace App\Http\Controllers\PublicOpen;

use App\DTO\PublicOpen\QuizIndexDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\PublicOpen\Quiz\IndexQuizRequest;
use App\Services\PublicOpen\QuizService;
use App\Models\Quiz;

class QuizController extends Controller
{
    public function __construct(private readonly QuizService $quizService) {}

    public function index(IndexQuizRequest $request)
    {
        return $this->quizService->index(QuizIndexDTO::fromArray($request->validated()));
    }

    public function show(int $id)
    {
        return Quiz::with('game')
            ->where('is_published', true)
            ->findOrFail($id);
    }
}
