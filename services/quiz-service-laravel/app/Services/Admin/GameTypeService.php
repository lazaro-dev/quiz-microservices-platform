<?php

namespace App\Services\Admin;

use App\DTO\Admin\GameTypeSaveDTO;
use App\Models\GameType;
use Illuminate\Support\Str;

class GameTypeService
{
    public function index()
    {
        return GameType::query()
            ->latest()
            ->paginate();
    }

    public function store(GameTypeSaveDTO $dto): GameType
    {
        return GameType::create([
            'name' => $dto->name,
            'slug' => $dto->slug
                ? Str::slug($dto->slug)
                : Str::slug($dto->name),

            'cover_image' => $dto->cover_image
        ]);
    }

    public function update(int $gameTypeId, GameTypeSaveDTO $dto): GameType
    {
        $gameType = GameType::findOrFail($gameTypeId);

        $gameType->update([
            'name' => $dto->name,
            'slug' => $dto->slug
                ? Str::slug($dto->slug)
                : Str::slug($dto->name),

            'cover_image' => $dto->cover_image
        ]);

        return $gameType;
    }

    public function destroy(int $gameTypeId): void
    {
        $gameType = GameType::findOrFail($gameTypeId);

        if ($gameType->games()->exists()) {
            throw new \Exception(
                'Não é possível remover um tipo que possui jogos.'
            );
        }

        $gameType->delete();
    }
}
