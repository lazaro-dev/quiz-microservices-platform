<?php

namespace App\Services\PublicOpen;

use App\DTO\PublicOpen\QuizIndexDTO;
use App\Models\Quiz;

class QuizService
{
    public function index(QuizIndexDTO $dto)
    {
        return Quiz::query()
            ->withCount(['questions', 'attempts'])
            ->with('game:id,name,slug')
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
                    ->orWhere('description', 'like', "%{$dto->search}%")
            )
            ->where('is_published', true)
            ->paginate($dto->per_page, ['*'], 'page', $dto->page);
    }

    public function show(string $slug)
    {
        return Quiz::query()
            ->with('game')
            ->withCount(['questions', 'attempts'])
            ->where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
