<?php

namespace App\Support\Policies;

use App\Models\Quiz;
use App\Support\AuthUser;

class QuizAuthorization
{
    public static function create(): bool
    {
        return AuthUser::isAdmin();
    }

    public static function update(
        Quiz $quiz
    ): bool {
        return AuthUser::isAdmin()
            || AuthUser::id() === $quiz->created_by;
    }

    public static function delete(): bool
    {
        return AuthUser::isAdmin();
    }
}
