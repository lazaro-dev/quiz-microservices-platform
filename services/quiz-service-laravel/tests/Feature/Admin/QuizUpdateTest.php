<?php

use App\Models\Game;
use App\Models\Quiz;

// it('debug env', function () {
//     dump(app()->environment());
//     dump(app()->runningUnitTests());
// });

it('Admin deve poder atualizar um quiz', function () {
    $prefix = '/quizzes/admin/quizzes';

    $game = Game::factory()->create();

    $quiz = Quiz::factory()->create([
        'game_id' => $game->id,
        'created_by' => 1
    ]);

    /** @var Tests\TestCase $this */
    $response = $this->withHeaders(
        authHeaders(userId: 1, role: 'admin')
    )->putJson(
        "{$prefix}/{$quiz->id}",
        [
            'game_id' => $game->id,
            'title' => 'Updated Quiz',
            'description' => 'Updated',
            'difficulty' => 'medium',
            'is_published' => true,
            'questions' => [

                [
                    'question_text' => 'Question',
                    'order' => 1,
                    'weight' => 1,
                    'options' => [
                        [
                            'option_text' => 'Correct',
                            'is_correct' => true
                        ],
                        [
                            'option_text' => 'Wrong',
                            'is_correct' => false
                        ]
                    ]
                ]
            ]
        ]
    );

    // dd(
    //     $response->status(),
    //     $response->json(),
    //     $response->content()
    // );

    $response->assertStatus(200);

    $this->assertDatabaseHas(
        'quizzes',
        [
            'id' => $quiz->id,
            'title' => 'Updated Quiz'
        ]
    );
});

it('Questões devem ter apenas uma resposta correta', function () {
    $prefix = '/quizzes/admin/quizzes';

    $game = Game::factory()->create();

    $quiz = Quiz::factory()->create([
        'game_id' => $game->id
    ]);

    /** @var Tests\TestCase $this */
    $response = $this->withHeaders(
        authHeaders(role: 'admin')
    )->putJson(
        "{$prefix}/{$quiz->id}",
        [
            'game_id' => $game->id,
            'title' => 'Invalid Quiz',
            'difficulty' => 'easy',
            'is_published' => true,
            'questions' => [
                [
                    'question_text' => 'Question',
                    'order' => 1,
                    'weight' => 1,
                    'options' => [
                        [
                            'option_text' => '1',
                            'is_correct' => true
                        ],
                        [
                            'option_text' => '2',
                            'is_correct' => true
                        ]
                    ]
                ]
            ]
        ]
    );

    $response->assertStatus(422);
});
