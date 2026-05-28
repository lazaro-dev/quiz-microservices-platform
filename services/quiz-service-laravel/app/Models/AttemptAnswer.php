<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'quiz_attempt_id',
    'question_id',
    'selected_option_id',
    'is_correct'
])]
#[WithoutTimestamps]
class AttemptAnswer extends Model
{
    protected function casts(): array
    {
        return [
            'is_correct' => 'boolean'
        ];
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function selectedOption()
    {
        return $this->belongsTo(
            Option::class,
            'selected_option_id'
        );
    }
}
