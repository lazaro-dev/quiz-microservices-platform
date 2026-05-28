<?php

namespace App\Services\Common;

use App\DTO\Common\RatingDTO;
use App\Models\Quiz;
use App\Models\Rating;

class RatingService
{
    public function save(RatingDTO $dto)
    {
        Rating::updateOrCreate(
            [
                'user_id' => $dto->user_id,
                'quiz_id' => $dto->quiz_id
            ],
            [
                'rating' => $dto->rating
            ]
        );

        $avg = Rating::where('quiz_id', $dto->quiz_id)->avg('rating');
        $count = Rating::where('quiz_id', $dto->quiz_id)->count();

        Quiz::where('id', $dto->quiz_id)->update([
            'avg_rating' => $avg,
            'total_ratings' => $count
        ]);
    }
}
