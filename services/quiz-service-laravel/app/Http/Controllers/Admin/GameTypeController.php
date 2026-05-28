<?php

namespace App\Http\Controllers\Admin;

use App\DTO\Admin\GameTypeSaveDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GameType\SaveGameTypeRequest;
use App\Services\Admin\GameTypeService;

class GameTypeController extends Controller
{
    public function __construct(private GameTypeService $gameTypeService) {}

    public function index()
    {
        return $this->gameTypeService->index();
    }

    public function store(SaveGameTypeRequest $request)
    {
        $result = $this->gameTypeService->store(
            GameTypeSaveDTO::fromArray($request->validated())
        );

        return response()->json($result, 201);
    }

    public function update(SaveGameTypeRequest $request, int $gameTypeId)
    {
        return $this->gameTypeService->update(
            $gameTypeId,
            GameTypeSaveDTO::fromArray($request->validated())
        );
    }

    public function destroy(int $gameTypeId)
    {
        $this->gameTypeService->destroy($gameTypeId);

        return response()->noContent();
    }
}
