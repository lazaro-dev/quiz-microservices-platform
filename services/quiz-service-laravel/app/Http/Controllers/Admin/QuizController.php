<?php

namespace App\Http\Controllers\Admin;

use App\DTO\Admin\QuizSaveDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Quiz\SaveQuizRequest;
use App\Services\Admin\QuizService;
use App\Models\Quiz;
use App\Support\AuthUser;
use App\Support\Policies\QuizAuthorization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class QuizController extends Controller
{
    public function __construct(private readonly QuizService $quizService) {}

    public function index(Request $request)
    {
        return Quiz::query()
            ->when(
                $request->game_id,
                fn($q) =>
                $q->where('game_id', $request->game_id)
            )
            ->when(
                $request->difficulty,
                fn($q) =>
                $q->where('difficulty', $request->difficulty)
            )
            ->when(
                $request->search,
                fn($q) =>
                $q->where('title', 'like', "%{$request->search}%")
            )
            ->where('is_published', true)
            ->paginate();
    }

    public function show(int $quizId)
    {
        return Quiz::with('game')
            ->where('is_published', true)
            ->findOrFail($quizId);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveQuizRequest $request)
    {
        if (!QuizAuthorization::create()) {
            throw new AccessDeniedHttpException('Ação não autorizada.');
        }

        $result = $this->quizService->store(
            QuizSaveDTO::fromArray([
                'created_by' => AuthUser::id(),
                ...$request->validated()
            ])
        );

        return response()->json($result, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveQuizRequest $request, Quiz $quiz)
    {
        if (!QuizAuthorization::update($quiz)) {
            throw new AccessDeniedHttpException('Ação não autorizada.');
        }

        return $this->quizService->update(
            $quiz->id,
            QuizSaveDTO::fromArray([
                'created_by' => $quiz->created_by,
                ...$request->validated()
            ])
        );
    }

    public function destroy(Quiz $quiz)
    {
        if (!QuizAuthorization::delete()) {
            throw new AccessDeniedHttpException('Ação não autorizada.');
        }
    }
}
