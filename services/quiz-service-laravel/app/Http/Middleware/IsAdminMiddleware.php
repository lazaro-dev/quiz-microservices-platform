<?php

namespace App\Http\Middleware;

use App\Support\AuthUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class IsAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!AuthUser::isAdmin()) {
            new AccessDeniedHttpException('Área restrita ao administrador');
        }

        return $next($request);
    }
}
