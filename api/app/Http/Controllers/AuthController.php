<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    private $jwtKey = 'your-secret-key';

    public function login(Request $request)
    {
        $this->validate($request, [
            'usuario' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('usuario', $request->input('usuario'))->first();
        if (!$user || !app('hash')->check($request->input('password'), $user->password)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        $tokenId    = base64_encode(random_bytes(32));
        $issuedAt   = new \DateTimeImmutable();
        $expire     = $issuedAt->modify('+1 day')->getTimestamp();

        $token = [
            'iat'  => $issuedAt->getTimestamp(),         // Tiempo de emisión del token
            'jti'  => $tokenId,                          // ID del token
            'iss'  => 'lumen-jwt',                       // Emisor
            'nbf'  => $issuedAt->getTimestamp(),         // No antes
            'exp'  => $expire,                           // Tiempo de expiración
            'data' => [                                  // Datos relacionados con el usuario
                'userId'   => $user->id,                 // Aquí iría el ID del usuario
                'usuario' => $user->usuario,             // Aquí iría el nombre usuario
            ]
        ];

        $jwt = JWT::encode($token, $this->jwtKey, 'HS256');

        return response()->json([
            'token' => $jwt,
        ]);
    }
}
