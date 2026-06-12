<?php

use App\Contracts\EventPublisher;
use App\Models\Game;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;

it('Deve poder responder um quiz', function () {
    $publisher = Mockery::mock(EventPublisher::class);

    $publisher->shouldReceive('publish')
        ->once()
        ->andReturnNull();

    app()->instance(
        EventPublisher::class,
        $publisher
    );

    $game = Game::factory()->create();

    $quiz = Quiz::factory()->create([
        'game_id' => $game->id,
        'plays_count' => 0,
        'is_published' => true
    ]);

    $question = Question::factory()->create([
        'quiz_id' => $quiz->id,
        'weight' => 5,
    ]);

    $correctOption = Option::factory()->create([
        'question_id' => $question->id,
        'is_correct' => true
    ]);

    Option::factory()->create([
        'question_id' => $question->id,
        'is_correct' => false
    ]);

    /** @var Tests\TestCase $this */
    $response = $this->withHeaders(
        authHeaders()
    )->postJson(
        "/quizzes/common/quizzes/{$quiz->id}/quiz-attempts",
        [
            'quiz_id' => $quiz->id,
            'time_seconds' => 30,
            'answers' => [
                [
                    'question_id' => $question->id,
                    'option_id' => $correctOption->id
                ]
            ]
        ]
    );

    $response->assertStatus(200)
        ->assertJson([
            'correct_answers' => 1,
            'accuracy' => 100,
            'earned_points' => 5,
            'total_points' => 5,
            'score' => 500,
            'time_seconds' => 30,
            'total_questions' => 1,
        ]);

    $this->assertDatabaseHas(
        'quiz_attempts',
        [
            'quiz_id' => $quiz->id,
            'user_id' => 1,
            'correct_answers' => 1
        ]
    );

    $quiz->refresh();

    expect($quiz->plays_count)->toBe(1);
});
