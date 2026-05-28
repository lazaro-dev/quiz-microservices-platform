<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // TEST ENVIRONMENT
        if (app()->environment('testing')) {
            return $this->test($request, $next);
        }

        $authHeader = $request->header('Authorization');

        if (!$authHeader) {
            return response()->json(['error' => 'Token não fornecido'], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        // return $next($request);
        try {
            $payload = JWT::decode(
                $token,
                new Key(getenv('JWT_SECRET'), 'HS256')
            );

            $request->attributes->set('user_id', $payload->sub);
            $request->attributes->set('username', $payload->username ?? null);
            $request->attributes->set('role', $payload->role ?? null);
        } catch (\Firebase\JWT\ExpiredException $e) {
            return response()->json([
                'status' => 401,
                'message' => 'Token expirado',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 401,
                'message' => 'Token inválido',
            ], 401);
        }

        return $next($request);
    }

    private function test(Request $request, Closure $next)
    {
        $request->attributes->set(
            'user_id',
            $request->header('X-User-Id', 1)
        );

        $request->attributes->set(
            'username',
            $request->header('X-Username', 'test-user')
        );

        $request->attributes->set(
            'role',
            $request->header('X-Role', 'common')
        );

        return $next($request);
    }
}
