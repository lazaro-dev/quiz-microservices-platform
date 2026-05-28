<?php

namespace App\Services\PublicOpen;

use App\Models\Game;
use App\Models\GameType;
use App\Models\Quiz;

class HomeService
{
    public function index(): array
    {
        $featuredGameTypes = GameType::query()
            ->withCount('games')
            ->latest()
            ->take(8)
            ->get();

        $featuredGames = Game::query()
            ->withCount('quizzes')
            ->orderByDesc('quizzes_count')
            ->take(10)
            ->get();

        $popularQuizzes = Quiz::query()
            ->where('is_published', true)
            ->orderByDesc('plays_count')
            ->take(12)
            ->get();

        $topRatedQuizzes = Quiz::query()
            ->where('is_published', true)
            ->orderByDesc('avg_rating')
            ->take(12)
            ->get();

        $recentQuizzes = Quiz::query()
            ->where('is_published', true)
            ->latest()
            ->take(12)
            ->get();

        return [
            'featured_game_types' => $featuredGameTypes,
            'featured_games' => $featuredGames,
            'popular_quizzes' => $popularQuizzes,
            'top_rated_quizzes' => $topRatedQuizzes,
            'recent_quizzes' => $recentQuizzes
        ];
    }
}
