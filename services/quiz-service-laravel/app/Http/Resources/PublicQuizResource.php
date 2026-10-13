<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'cover_image' => $this->cover_image,
            'difficulty' => $this->difficulty,
            'category' => $this->game?->name,
            'questions_count' => $this->questions_count,
            'attempts_count' => $this->attempts_count,
            'avg_rating' => round($this->avg_rating, 1),
            'total_ratings' => $this->total_ratings,
            'game' => $this->game
        ];
    }
}
