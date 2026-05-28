<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'game_id' => Game::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'cover_image' => fake()->imageUrl(),
            'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
            'is_published' => true,
            'plays_count' => fake()->numberBetween(0, 1000),
            'avg_rating' => fake()->randomFloat(1, 1, 5),
            'created_by' => 1,
        ];
    }

    public function withQuestions(int $questions = 5): static
    {
        return $this->afterCreating(
            function ($quiz) use ($questions) {
                Question::factory()
                    ->count($questions)
                    ->create([
                        'quiz_id' => $quiz->id
                    ]);
            }
        );
    }
}
