<?php

namespace App\Http\Controllers\Admin;

use App\DTO\Admin\GameSaveDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Game\SaveGameRequest;
use App\Services\Admin\GameService;
use App\Models\Game;

class GameController extends Controller
{
    public function __construct(private GameService $gameService) {}

    public function index()
    {
        return $this->gameService->index();
    }

    public function store(SaveGameRequest $request)
    {
        $result = $this->gameService->store(
            GameSaveDTO::fromArray($request->validated())
        );

        return response()->json($result, 201);
    }

    public function update(SaveGameRequest $request, int $gameId)
    {
        return $this->gameService->update(
            $gameId,
            GameSaveDTO::fromArray($request->validated())
        );
    }

    public function destroy(int $gameId)
    {
        $this->gameService->destroy($gameId);

        return response()->noContent();
    }
}
