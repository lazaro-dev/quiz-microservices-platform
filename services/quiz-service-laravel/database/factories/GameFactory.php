<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\GameType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(2,true);

        return [
            'game_type_id' => GameType::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'cover_image' => fake()->imageUrl(),
        ];
    }
}
