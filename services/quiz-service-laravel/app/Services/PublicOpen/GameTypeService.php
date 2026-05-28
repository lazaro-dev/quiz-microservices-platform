<?php

namespace App\Services\PublicOpen;

use App\Models\GameType;

class GameTypeService
{
    public function index()
    {
        return GameType::query()
            ->withCount('games')
            ->paginate();
    }

    public function show(string $slug)
    {
        return GameType::query()
            ->with([
                'games' => fn($q) => $q->withCount('quizzes')
            ])
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
