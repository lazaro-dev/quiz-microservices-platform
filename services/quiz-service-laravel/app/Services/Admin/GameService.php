<?php


namespace App\Services\Admin;

use App\DTO\Admin\GameSaveDTO;
use App\Models\Game;
use Illuminate\Support\Str;

class GameService
{
    public function index()
    {
        return Game::query()
            ->with('gameType')
            ->latest()
            ->paginate();
    }

    public function store(GameSaveDTO $dto): Game
    {
        return Game::create([
            'game_type_id' => $dto->game_type_id,
            'name' => $dto->name,

            'slug' => $dto->slug
                ? Str::slug($dto->slug)
                : Str::slug($dto->name),

            'description' => $dto->description,
            'cover_image' => $dto->cover_image
        ]);
    }

    public function update(int $gameId, GameSaveDTO $dto): Game
    {
        $game = Game::findOrFail($gameId);

        $slug = $dto->slug
            ? Str::slug($dto->slug)
            : Str::slug($dto->name);

        $game->update([
            'game_type_id' => $dto->game_type_id,
            'name' => $dto->name,
            'slug' => $slug,
            'description' => $dto->description,
            'cover_image' => $dto->cover_image
        ]);

        return $game;
    }

    public function destroy(int $gameId): void
    {
        $game = Game::findOrFail($gameId);

        if ($game->quizzes()->exists()) {
            throw new \Exception(
                'Não é possível remover um jogo que possui quizzes.'
            );
        }

        $game->delete();
    }
}
