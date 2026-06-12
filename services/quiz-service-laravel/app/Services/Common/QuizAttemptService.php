<?php

namespace App\Services\Common;

use App\Contracts\EventPublisher;
use App\Contracts\Events\QuizFinishedEvent;
use App\DTO\Common\QuizAttemptDTO;
use App\Exceptions\InvalidAnswerException;
use App\Infrastructure\RabbitMQ\RabbitMQTopology;
use App\Models\AttemptAnswer;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Support\AuthUser;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Support\Str;

class QuizAttemptService
{
    public function __construct(private EventPublisher $publisher) {}

    public function store(QuizAttemptDTO $dto)
    {
        $quiz = Quiz::with('questions.options')
            ->findOrFail($dto->quiz_id);

        $questions = $quiz->questions;


        if ($questions->isEmpty()) {
            throw new \Exception(
                'Quiz sem perguntas'
            );
        }

        $validQuestionIds = $questions->pluck('id');

        $answers = collect($dto->answers);

        if ($answers->pluck('question_id')->diff($validQuestionIds)->isNotEmpty()) {
            throw new InvalidAnswerException('Pergunta inválida');
        }

        $correct = 0;
        $earnedPoints = 0;

        $attempt = QuizAttempt::create([
            'user_id' => $dto->user_id,
            'quiz_id' => $quiz->id,
            'username' => $dto->username,
            'score' => 0,
            'accuracy' => 0,
            'total_questions' => $questions->count(),
            'correct_answers' => 0,
            'time_seconds' => $dto->time_seconds
        ]);

        foreach ($answers as $answer) {

            $question = $questions->firstWhere('id', $answer['question_id']);

            $option = $question->options->firstWhere('id', $answer['option_id']);

            if (!$option) continue;

            $isCorrect = $option->is_correct;

            if ($isCorrect) {
                $correct++;

                $earnedPoints += $question->weight;
            }

            AttemptAnswer::create([
                'quiz_attempt_id' => $attempt->id,
                'question_id' => $question->id,
                'selected_option_id' => $option->id,
                'is_correct' => $isCorrect
            ]);
        }

        if ($questions->sum('weight') <= 0) {
            throw new \Exception(
                'Quiz com pesos inválidos'
            );
        }

        $totalPossiblePoints =  $questions->sum('weight');

        $accuracy =  ($earnedPoints / $totalPossiblePoints) * 100;

        $expectedTime = $questions->count() * 30;

        //Penalidade max por tempo 25%
        //Bônus max por tempo 25%
        $timeMultiplier = min(
            1.25,
            max(
                0.75,
                sqrt(
                    $expectedTime /
                        max(1, $dto->time_seconds)
                )
            )
        );

        $rankingScore = round(
            $earnedPoints
                * 100
                * $timeMultiplier
        );

        $attempt->update([
            'score' => $rankingScore,
            'accuracy' => round($accuracy, 2),
            'correct_answers' => $correct
        ]);

        $quiz->increment('plays_count');

        $event = new QuizFinishedEvent(
            eventId: Str::uuid()->toString(),
            quizId: $quiz->id,
            userId: $dto->user_id,
            username: $dto->username,
            avatar: $dto->avatar,
            score: $rankingScore,
            completedAt: now()->toISOString(),
        );

        $this->publisher->publish(
            RabbitMQTopology::QUIZ_EVENTS_EXCHANGE,
            RabbitMQTopology::QUIZ_FINISHED_ROUTING_KEY,
            $event->toArray()
        );

        return [
            'score' => $rankingScore,
            'accuracy' => round($accuracy, 2),
            'correct_answers' => $correct,
            'total_questions' => $questions->count(),
            'earned_points' => $earnedPoints,
            'total_points' => $totalPossiblePoints,
            'time_seconds' => $dto->time_seconds,
        ];
    }

    public function myAttempts()
    {
        return QuizAttempt::query()
            ->with([
                'quiz:id,title,cover_image'
            ])
            ->where('user_id', AuthUser::id())
            ->latest()
            ->paginate();
    }

    public function myQuizAttempts(int $quizId)
    {
        return QuizAttempt::query()
            ->with([
                'quiz:id,title,cover_image'
            ])
            ->where('user_id', AuthUser::id())
            ->where('quiz_id', $quizId)
            ->latest()
            ->paginate();
    }

    public function show(int $attemptId)
    {
        $attempt = QuizAttempt::query()
            ->with([
                'quiz:id,title',
                'answers.question.options',
                'answers.selectedOption'
            ])
            ->findOrFail($attemptId);

        if (
            !AuthUser::isAdmin()
            && $attempt->user_id !== AuthUser::id()
        ) {
            throw new AccessDeniedHttpException('Ação não autorizada.');
        }

        return [
            'id' => $attempt->id,
            'quiz' => $attempt->quiz,
            'score' => $attempt->score,
            'correct_answers' => $attempt->correct_answers,
            'total_questions' => $attempt->total_questions,
            'time_seconds' => $attempt->time_seconds,
            'created_at' => $attempt->created_at,
            'questions' => $attempt->answers->map(
                function ($answer) {
                    $correctOption = $answer
                        ->question
                        ->options
                        ->firstWhere(
                            'is_correct',
                            true
                        );

                    return [
                        'question' => [
                            'id' => $answer->question->id,
                            'question_text' => $answer->question->question_text,
                        ],

                        'selected_option' => [
                            'id' => $answer->selectedOption?->id,
                            'option_text' => $answer->selectedOption?->option_text,
                        ],

                        'correct_option' => [
                            'id' => $correctOption?->id,
                            'option_text' => $correctOption?->option_text,
                        ],

                        'is_correct' => $answer->is_correct
                    ];
                }
            )
        ];
    }
}
