<?php

namespace App\Services\PublicOpen;

use App\Models\Game;

class GameService
{
    public function index()
    {
        return Game::query()
            ->with('gameType')
            ->withCount('quizzes')
            ->paginate();
    }

    public function show(string $slug)
    {
        return Game::query()
            ->with([
                'gameType',
                'quizzes' => fn($q) => $q->where('is_published', true)
            ])
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
