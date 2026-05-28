<?php

use App\Exceptions\{
    InvalidAnswerException,
    InvalidQuestionException
};
use App\Http\Middleware as MiddlewareAlias;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\{
    BadRequestHttpException,
    NotFoundHttpException,
    UnauthorizedHttpException,
    UnprocessableEntityHttpException,
    AccessDeniedHttpException,
};

if (!function_exists('makeHttpErrorResponse')) {
    function makeHttpErrorResponse(string|array $message, int $status): array
    {
        return [
            [
                "status" => $status,
                "message" => $message
            ],
            $status
        ];
    }
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        apiPrefix: '',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'jwt' => MiddlewareAlias\JwtMiddleware::class,
            'is.admin' => MiddlewareAlias\IsAdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e) {
            $error = match (true) {
                $e instanceof BadRequestHttpException => makeHttpErrorResponse(message: $e?->getMessage(), status: 400),
                $e instanceof UnauthorizedHttpException => makeHttpErrorResponse(message: $e?->getMessage(), status: 401),
                $e instanceof AccessDeniedHttpException => makeHttpErrorResponse(message: $e?->getMessage(), status: 403),
                $e instanceof NotFoundHttpException => makeHttpErrorResponse(message: $e?->getMessage(), status: 404),
                $e instanceof ModelNotFoundException => makeHttpErrorResponse(message: $e?->getMessage(), status: 404),
                $e instanceof UnprocessableEntityHttpException => makeHttpErrorResponse(message: $e?->getMessage(), status: 422),
                $e instanceof ValidationException => makeHttpErrorResponse(message: \optional($e)?->errors(), status: 422),
                $e instanceof InvalidAnswerException => makeHttpErrorResponse(message: \optional($e)?->getMessage(), status: 422),
                $e instanceof InvalidQuestionException => makeHttpErrorResponse(message: \optional($e)?->getMessage(), status: 422),
                default => makeHttpErrorResponse(message: "Erro interno do servidor", status: 500),
            };

            return response()->json(...$error);
        });
    })->create();
