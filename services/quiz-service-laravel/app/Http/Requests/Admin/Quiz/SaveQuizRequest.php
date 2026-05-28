<?php

namespace App\Http\Requests\Admin\Quiz;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveQuizRequest extends FormRequest
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
            'game_id' => ['required', 'exists:games,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'difficulty' => ['required', 'in:easy,medium,hard'],
            'is_published' => ['required', 'boolean'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.question_text' => [
                'required',
                'string'
            ],
            'questions.*.image_url' => [
                'nullable',
                'string'
            ],
            'questions.*.order' => [
                'required',
                'integer',
                'min:1'
            ],
            'questions.*.options' => [
                'required',
                'array',
                'min:2'
            ],
            'questions.*.options.*.option_text' => [
                'required',
                'string'
            ],
            'questions.*.options.*.is_correct' => [
                'required',
                'boolean'
            ],
        ];
    }
}
