<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'quiz_id',
    'username',
    'score',
    'accuracy',
    'total_questions',
    'correct_answers',
    'time_seconds'
])]
class QuizAttempt extends Model
{
    use HasFactory;

    public function answers()
    {
        return $this->hasMany(AttemptAnswer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
