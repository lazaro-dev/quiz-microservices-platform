<?php

namespace App\Http\Controllers\PublicOpen;

use App\Http\Controllers\Controller;
use App\Services\PublicOpen\GameTypeService;

class GameTypeController extends Controller
{
    public function __construct(private GameTypeService $gameTypeService) {}

    public function index()
    {
        return $this->gameTypeService->index();
    }

    public function show(string $slug)
    {
        return $this->gameTypeService->show($slug);
    }
}
