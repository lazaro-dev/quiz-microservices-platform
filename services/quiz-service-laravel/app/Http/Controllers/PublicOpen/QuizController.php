<?php

namespace App\Http\Controllers\PublicOpen;

use App\DTO\PublicOpen\QuizIndexDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\PublicOpen\Quiz\IndexQuizRequest;
use App\Http\Resources\PublicQuizDetailResource;
use App\Http\Resources\PublicQuizResource;
use App\Services\PublicOpen\QuizService;
use App\Models\Quiz;

class QuizController extends Controller
{
    public function __construct(private readonly QuizService $quizService) {}

    public function index(IndexQuizRequest $request)
    {
        return PublicQuizResource::collection(
            $this->quizService->index(QuizIndexDTO::fromArray(
                [
                    ...$request->validated(),
                    "page" => $request?->page,
                    "per_page" => $request?->per_page
                ]
            ))
        );
    }

    public function show(string $slug)
    {
        return new PublicQuizDetailResource(
            $this->quizService->show($slug)
        );
    }
}
