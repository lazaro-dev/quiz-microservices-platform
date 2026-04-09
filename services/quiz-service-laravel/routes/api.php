<?php

use Illuminate\Support\Facades\Route;


Route::prefix('quizzes')->group(function () {
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'service' => 'quiz-service'
        ]);
    });
});
