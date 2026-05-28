<?php

namespace App\Services\PublicOpen;

use App\DTO\PublicOpen\QuizIndexDTO;
use App\Models\Quiz;

class QuizService
{
    public function index(QuizIndexDTO $dto)
    {
        return Quiz::query()
            ->when(
                $dto->game_id,
                fn($q) =>
                $q->where('game_id', $dto->game_id)
            )
            ->when(
                $dto->difficulty,
                fn($q) =>
                $q->where('difficulty', $dto->difficulty)
            )
            ->when(
                $dto->search,
                fn($q) =>
                $q->where('title', 'like', "%{$dto->search}%")
            )
            ->where('is_published', true)
            ->paginate();
    }

    public function show($id)
    {
        return Quiz::with('game')
            ->where('is_published', true)
            ->findOrFail($id);
    }
}
