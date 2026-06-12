<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Game;
use App\Models\GameType;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        $types = [
            'Soulslike',
            'FPS',
            'RPG',
            'Battle Royale',
            'MOBA'
        ];

        foreach ($types as $typeName) {

            $type = GameType::create([
                'name' => $typeName,
                'slug' => Str::slug($typeName)
            ]);

            $gamesList = match ($typeName) {
                'Soulslike' => ['Elden Ring', 'Dark Souls 3', 'Bloodborne'],
                'FPS' => ['CS2', 'Call of Duty', 'Battlefield'],
                'RPG' => ['The Witcher 3', 'Skyrim'],
                'Battle Royale' => ['Fortnite', 'Warzone'],
                'MOBA' => ['League of Legends', 'Dota 2'],
            };

            foreach ($gamesList as $gameName) {

                $game = Game::create([
                    'game_type_id' => $type->id,
                    'name' => $gameName,
                    'slug' => Str::slug($gameName),
                    'cover_image' => Str::slug($gameName) . '.jpg'
                ]);

                for ($i = 1; $i <= 3; $i++) {

                    $quiz = Quiz::create([
                        'game_id' => $game->id,
                        'title' => "$gameName Quiz #$i",
                        'description' => "Teste sobre $gameName",
                        'difficulty' => ['easy', 'medium', 'hard'][rand(0, 2)],
                        'is_published' => true
                    ]);

                    for ($q = 1; $q <= rand(5, 8); $q++) {

                        $question = Question::create([
                            'quiz_id' => $quiz->id,
                            'question_text' => "Pergunta $q sobre $gameName?",
                            'order' => $q
                        ]);

                        $correctIndex = rand(1, 4);

                        for ($o = 1; $o <= 4; $o++) {
                            Option::create([
                                'question_id' => $question->id,
                                'option_text' => "Opção $o",
                                'is_correct' => $o === $correctIndex
                            ]);
                        }
                    }

                    foreach ($users->random(3) as $user) {
                        Rating::create([
                            'user_id' => $user,
                            'quiz_id' => $quiz->id,
                            'username' => "user_{$user}",
                            'rating' => rand(3, 5)
                        ]);
                    }

                    foreach ($users->random(2) as $user) {
                        Comment::create([
                            'user_id' => $user,
                            'quiz_id' => $quiz->id,
                            'username' => "user_{$user}",
                            'content' => 'Muito bom esse quiz!'
                        ]);
                    }

                    $avg = $quiz->ratings()->avg('rating') ?? 0;
                    $count = $quiz->ratings()->count();

                    $quiz->update([
                        'avg_rating' => $avg,
                        'total_ratings' => $count
                    ]);
                }
            }
        }
    }
}
