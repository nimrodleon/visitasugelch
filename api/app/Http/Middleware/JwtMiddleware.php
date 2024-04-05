<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

class JwtMiddleware
{
    private $jwtKey = 'your-secret-key'; // Reemplaza esto con tu clave secreta

    public function handle($request, Closure $next, $guard = null)
    {
        $token = $request->get('token');

        if (!$token) {
            // Unauthorized response if token not there
            return response()->json([
                'error' => 'Token not provided.'
            ], 401);
        }

        try {
            $credentials = JWT::decode($token, new Key($this->jwtKey, 'HS256'));
        } catch (ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        }

        // Now let's put the user in the request class so that you can grab it from there
        $request->auth = $credentials;

        return $next($request);
    }
}
