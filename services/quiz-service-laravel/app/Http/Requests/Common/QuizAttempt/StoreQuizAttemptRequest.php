<?php

namespace App\Http\Requests\Common\QuizAttempt;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuizAttemptRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'time_seconds' => ['required', 'integer', 'min:5', 'max:3600'],
            'answers' => ['required', 'array', 'min:1'],
            'answers.*.question_id' => ['required', 'exists:questions,id'],
            'answers.*.option_id' => ['required', 'exists:options,id'],
        ];
    }
}
