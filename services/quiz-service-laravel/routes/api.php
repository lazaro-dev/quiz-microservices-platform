<?php

use App\Http\Controllers\Admin as Admin;
use App\Http\Controllers\Common as Common;
use App\Http\Controllers\PublicOpen as PublicOpen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::prefix('quizzes')->group(function () {
//     Route::get('/health', function () {
//         return response()->json([
//             'status' => 'ok',
//             'service' => 'quiz-service'
//         ]);
//     });
// });

Route::group(['prefix' => 'quizzes'], function () {

    // Route::get('/me', function (Request $request) {
    //     return [
    //         'user_id' => $request->attributes->get('user_id'),
    //         'username' => $request->attributes->get('username'),
    //         'role' => $request->attributes->get('role'),
    //     ];
    // });

    Route::group(['prefix' => 'public'], function () {
        Route::get('/home', [PublicOpen\HomeController::class, 'index']);
        Route::get('/game-types', [PublicOpen\GameTypeController::class, 'index']);
        Route::get('/game-types/{slug}', [PublicOpen\GameTypeController::class, 'show']);
        Route::get('/games', [PublicOpen\GameController::class, 'index']);
        Route::get('/games/{slug}', [PublicOpen\GameController::class, 'show']);
        Route::get('/quizzes', [PublicOpen\QuizController::class, 'index']);
        Route::get('/quizzes/{id}', [PublicOpen\QuizController::class, 'show']);
    });

    Route::group(['middleware' => ['jwt'], 'prefix' => 'common'], function () {
        Route::get('/my-attempts', [Common\QuizAttemptController::class, 'myAttempts']);
        Route::get('//my-attempts/{quiz}', [Common\QuizAttemptController::class, 'myQuizAttempts']);
        Route::get('/attempts/{attempt}', [Common\QuizAttemptController::class, 'show']);

        Route::get('/quizzes/{quiz}/play', [Common\QuizPlayController::class, 'play']);

        Route::post('quizzes/{quiz}/quiz-attempts', [Common\QuizAttemptController::class, 'store']);

        Route::post('/quizzes/{quiz}/rating', [Common\RatingController::class, 'rate']);

        Route::post('/quizzes/{quiz}/comments', [Common\CommentController::class, 'store']);
        Route::get('/quizzes/{quiz}/comments', [Common\CommentController::class, 'index']);
    });

    Route::group(['middleware' => ['jwt', 'is.admin'], 'prefix' => 'admin'], function () {
        Route::apiResource('quizzes', Admin\QuizController::class);
        Route::apiResource('games', Admin\GameController::class);
        Route::apiResource('game-types', Admin\GameTypeController::class);

        Route::get('/quizzes/{quiz}/attempts', [Admin\QuizAttemptController::class, 'quizAttempts']);

        Route::get('/attempts/{attempt}', [Admin\QuizAttemptController::class, 'show']);
    });
});
