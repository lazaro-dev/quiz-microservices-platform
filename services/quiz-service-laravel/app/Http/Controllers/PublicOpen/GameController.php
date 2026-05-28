<?php

namespace App\Http\Controllers\PublicOpen;

use App\Http\Controllers\Controller;
use App\Services\PublicOpen\GameService;

class GameController extends Controller
{
    public function __construct(private GameService $gameService) {}

    public function index()
    {
        return $this->gameService->index();
    }

    public function show(string $slug)
    {
        return $this->gameService->show($slug);
    }
}
