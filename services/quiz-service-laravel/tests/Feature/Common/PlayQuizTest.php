<?php

use App\Models\Game;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;

it('Não expor respostas corretas para rota de play', function () {

    $game = Game::factory()->create();

    $quiz = Quiz::factory()->create([
        'game_id' => $game->id,
        'is_published' => true
    ]);

    $question = Question::factory()->create([
        'quiz_id' => $quiz->id
    ]);

    Option::factory()->create([
        'question_id' => $question->id,
        'is_correct' => true
    ]);

    /** @var Tests\TestCase $this */
    $response = $this->withHeaders(
        authHeaders()
    )->getJson(
        "/quizzes/common/quizzes/{$quiz->id}/play"
    );

    $response->assertStatus(200)
        ->assertJsonMissing([
            'is_correct' => true
        ]);
});
