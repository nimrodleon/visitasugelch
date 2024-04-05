<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        if ($request->user->role != $role) {
            // Unauthorized response if user role doesn't match
            return response()->json([
                'error' => 'User does not have the right role.'
            ], 403);
        }

        return $next($request);
    }
}
