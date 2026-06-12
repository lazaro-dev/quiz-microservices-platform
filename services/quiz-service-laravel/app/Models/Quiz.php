<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'game_id',
    'title',
    'description',
    'cover_image',
    'difficulty',
    'is_published',
    'avg_rating',
    'total_ratings'
])]
class Quiz extends Model
{
    use HasFactory;
    
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'avg_rating' => 'float',
        ];
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
