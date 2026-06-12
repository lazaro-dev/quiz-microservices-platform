<?php

use App\Contracts\EventPublisher;
use App\Models\QuizAttempt;

it('Usuário não deve ver outras tentativas de outros usuários', function () {

    $publisher = Mockery::mock(EventPublisher::class);

    app()->instance(
        EventPublisher::class,
        $publisher
    );

    $attempt = QuizAttempt::factory()->create([
        'user_id' => 999,
        'accuracy' => 90
    ]);

    /** @var Tests\TestCase $this */
    $response = $this->withHeaders(
        authHeaders(userId: 1)
    )->getJson(
        "/quizzes/common/attempts/{$attempt->id}"
    );

    $response->assertStatus(403);
});
