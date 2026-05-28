<?php

namespace Database\Factories;

use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Question>
 */
class QuestionFactory extends Factory
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
            'question_text' => fake()->sentence(),
            'image_url' => fake()->optional()->imageUrl(),
            'order' => fake()->numberBetween(1, 20),
        ];
    }

    public function withOptions(int $options = 4): static
    {
        return $this->afterCreating(
            function ($question) use ($options) {
                Option::factory()
                    ->count($options - 1)
                    ->create([
                        'question_id' => $question->id,
                        'is_correct' => false
                    ]);

                Option::factory()
                    ->create([
                        'question_id' => $question->id,
                        'is_correct' => true
                    ]);
            }
        );
    }
}
