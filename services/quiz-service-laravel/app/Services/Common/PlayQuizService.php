<?php

namespace App\Services\Common;

use App\Models\Quiz;

class PlayQuizService
{
    public function play(int $quizId): Quiz
    {
        $quiz = Quiz::query()
            ->with([
                'questions.options'
            ])
            ->where('is_published', true)
            ->findOrFail($quizId);

        $quiz->questions->each(function ($question) {
            $question->options->each(function ($option) {
                unset($option->is_correct);
            });
        });

        return $quiz;
    }
}
