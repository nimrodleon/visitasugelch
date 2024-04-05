<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class JwtMiddleware
{
    private $jwtKey = 'your-secret-key'; // Replace this with your secret key

    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            // Unauthorized response if token not provided
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
                'error' => 'An error occurred while decoding token.'
            ], 400);
        }
        // Now let's put the user in the request class so that you can access it from there
        // $request->auth = $credentials;
        return $next($request);
    }
}
