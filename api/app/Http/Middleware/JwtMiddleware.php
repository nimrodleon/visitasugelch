<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class JwtMiddleware
{
    private $jwtKey = 'your-secret-key'; // Reemplaza esto con tu clave secreta

    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

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

        // Buscar al usuario en la base de datos.
        $user = User::find($credentials->data->userId);

        // Agregar el usuario al request.
        $request->merge(['user' => $user]);

        return $next($request);
    }
}
