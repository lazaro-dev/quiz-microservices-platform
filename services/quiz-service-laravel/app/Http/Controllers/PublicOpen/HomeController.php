<?php

namespace App\Http\Controllers\PublicOpen;

use App\Http\Controllers\Controller;
use App\Services\PublicOpen\HomeService;

class HomeController extends Controller
{
    public function __construct(private HomeService $service) {}

    public function index()
    {
        return $this->service->index();
    }
}
