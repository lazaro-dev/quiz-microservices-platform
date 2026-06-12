<?php

namespace Database\Seeders;

use App\Models\AttemptAnswer;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $quizzes = Quiz::with('questions.options')->get();

        foreach ($users as $user) {
            foreach ($quizzes->random(5) as $quiz) {

                $correct = 0;

                $attempt = QuizAttempt::create([
                    'user_id' => $user,
                    'quiz_id' => $quiz->id,
                    'username' => "user_{$user}",
                    'score' => 0,
                    'accuracy' => 0,
                    'total_questions' => $quiz->questions->count(),
                    'correct_answers' => 0,
                    'time_seconds' => rand(30, 300)
                ]);

                foreach ($quiz->questions as $question) {

                    $option = $question->options->random();
                    $isCorrect = $option->is_correct;

                    if ($isCorrect) $correct++;

                    AttemptAnswer::create([
                        'quiz_attempt_id' => $attempt->id,
                        'question_id' => $question->id,
                        'selected_option_id' => $option->id,
                        'is_correct' => $isCorrect
                    ]);
                }

                $score = ($correct / $quiz->questions->count()) * 100;

                $attempt->update([
                    'score' => round($score, 0),
                    'correct_answers' => $correct
                ]);
            }
        }
    }
}
