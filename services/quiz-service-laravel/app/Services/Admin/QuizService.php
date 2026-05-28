<?php

namespace App\Services\Admin;

use App\DTO\Admin\QuizSaveDTO;
use App\DTO\PublicOpen\QuizIndexDTO;
use App\Exceptions\InvalidQuestionException;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Support\Facades\DB;

class QuizService
{
    public function index(QuizIndexDTO $dto)
    {
        return Quiz::query()
            ->when(
                $dto->game_id,
                fn($q) => $q->where('game_id', $dto->game_id)
            )
            ->when(
                $dto->difficulty,
                fn($q) => $q->where('difficulty', $dto->difficulty)
            )
            ->when(
                $dto->search,
                fn($q) => $q->where('title', 'like', "%{$dto->search}%")
            )
            ->where('is_published', true)
            ->paginate();
    }

    public function show(int $quizId)
    {
        return Quiz::with('game')
            ->where('is_published', true)
            ->findOrFail($quizId);
    }

    public function store(QuizSaveDTO $dto): Quiz
    {
        return DB::transaction(function () use ($dto) {

            $quiz = Quiz::create([
                'game_id' => $dto->game_id,
                'title' => $dto->title,
                'description' => $dto?->description,
                'cover_image' => $dto?->cover_image,
                'difficulty' => $dto->difficulty,
                'is_published' => $dto->is_published,
                'created_by' => $dto->created_by,
            ]);

            $this->syncQuestions(
                quiz: $quiz,
                questions: $dto->questions
            );

            return $quiz->fresh([
                'questions.options'
            ]);
        });
    }

    public function update(int $quizId, QuizSaveDTO $dto): Quiz
    {
        return DB::transaction(function () use ($quizId, $dto) {

            $quiz = Quiz::query()
                ->with('questions.options')
                ->findOrFail($quizId);

            // bloqueia edição se já tiver tentativas
            if ($quiz->attempts()->exists()) {
                throw new \Exception(
                    'Não é possível editar quizzes já respondidos.'
                );
            }

            $quiz->update([
                'game_id' => $dto->game_id,
                'title' => $dto->title,
                'description' => $dto?->description,
                'cover_image' => $dto?->cover_image,
                'difficulty' => $dto->difficulty,
                'is_published' => $dto->is_published,
            ]);

            // remove options antigas
            Option::query()
                ->whereIn(
                    'question_id',
                    $quiz->questions->pluck('id')
                )
                ->delete();

            // remove questions antigas
            Question::query()
                ->where('quiz_id', $quiz->id)
                ->delete();

            $this->syncQuestions(
                quiz: $quiz,
                questions: $dto->questions
            );

            return $quiz->fresh([
                'questions.options'
            ]);
        });
    }

    private function syncQuestions(Quiz $quiz, array $questions): void
    {
        foreach ($questions as $questionData) {

            // valida apenas uma correta
            $correctCount = collect($questionData['options'])
                ->where('is_correct', true)
                ->count();

            if ($correctCount !== 1) {
                throw new InvalidQuestionException(
                    "A pergunta '{$questionData['question_text']}'
                    deve possuir exatamente uma resposta correta."
                );
            }

            $question = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => $questionData['question_text'],
                'image_url' => $questionData['image_url'] ?? null,
                'order' => $questionData['order']
            ]);

            foreach ($questionData['options'] as $optionData) {

                Option::create([
                    'question_id' => $question->id,
                    'option_text' => $optionData['option_text'],
                    'is_correct' => $optionData['is_correct']
                ]);
            }
        }
    }

    //   {
    //     "game_id": 1,
    //     "title": "Quiz Elden Ring",
    //     "description": "Teste seu conhecimento",
    //     "cover_image": "elden-ring.jpg",
    //     "difficulty": "medium",
    //     "is_published": true,
    //     "questions": [
    //         {
    //         "question_text": "Qual o nome do mundo?",
    //         "order": 2,
    //         "options": [
    //             {
    //             "option_text": "The Lands Between",
    //             "is_correct": true
    //             },
    //             {
    //             "option_text": "Lordran",
    //             "is_correct": false
    //             }
    //         ]
    //         },
    //         {
    //         "question_text": "Quem é Margit?",
    //         "order": 1,
    //         "options": [
    //             {
    //             "option_text": "Boss",
    //             "is_correct": true
    //             },
    //             {
    //             "option_text": "NPC",
    //             "is_correct": false
    //             }
    //         ]
    //         }
    //     ]
    //     }
}
