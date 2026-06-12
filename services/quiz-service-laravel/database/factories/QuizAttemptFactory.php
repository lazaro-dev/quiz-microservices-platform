<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<QuizAttempt>
 */
class QuizAttemptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quiz_id' => Quiz::factory(),
            'user_id' => fake()->numberBetween(1, 999),
            'username' => fake()->username(),
            'score' => fake()->numberBetween(0, 100),
            'accuracy' => fake()->numberBetween(0, 100),
            'correct_answers' => fake()->numberBetween(0, 10),
            'total_questions' => 10,
            'time_seconds' => fake()->numberBetween(10, 300),
        ];
    }
}
