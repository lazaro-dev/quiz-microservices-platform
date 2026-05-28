<?php

namespace App\Http\Controllers\Common;

use App\DTO\Common\RatingDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Common\Rating\SaveRatingRequest;
use App\Services\Common\RatingService;
use App\Support\AuthUser;

class RatingController extends Controller
{
    public function __construct(private readonly RatingService $ratingService) {}

    public function save(SaveRatingRequest $request, int $quizId)
    {
        $this->ratingService->save(
            RatingDTO::fromArray([
                "user_id" => AuthUser::id(),
                "username" => AuthUser::username(),
                "quiz_id" => $quizId,
                ...$request->validated()
            ])
        );
    }
}
