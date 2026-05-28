<?php

namespace App\Http\Requests\Admin\Game;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveGameRequest extends FormRequest
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
            'game_type_id' => ['required', 'exists:game_types,id'],
            'name' => ['required', 'string'],
            'slug' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
        ];
    }
}
