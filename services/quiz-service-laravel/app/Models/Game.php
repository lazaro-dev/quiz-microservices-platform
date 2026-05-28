<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'game_type_id',
    'name',
    'description',
    'slug',
    'cover_image'
])]
class Game extends Model
{
    use HasFactory;

    public function type()
    {
        return $this->belongsTo(GameType::class, 'game_type_id');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
