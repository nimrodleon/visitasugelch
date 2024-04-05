<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    private $jwtKey = 'your-secret-key'; // Reemplaza esto con tu clave secreta

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Normalmente, buscarías al usuario en tu base de datos aquí.
        // Este es solo un ejemplo, así que asumiremos que el usuario está autenticado.

        $tokenId    = base64_encode(random_bytes(32));
        $issuedAt   = new \DateTimeImmutable();
        $expire     = $issuedAt->modify('+1 day')->getTimestamp();      // Puede ajustar el tiempo de expiración del token como desees

        $token = [
            'iat'  => $issuedAt->getTimestamp(),         // Tiempo de emisión del token
            'jti'  => $tokenId,                          // ID del token
            'iss'  => 'lumen-jwt',                       // Emisor
            'nbf'  => $issuedAt->getTimestamp(),         // No antes
            'exp'  => $expire,                           // Tiempo de expiración
            'data' => [                                  // Datos relacionados con el usuario
                'userId'   => 1,                         // Aquí iría el ID del usuario
                'email' => $request->input('email'),     // Aquí iría el email del usuario
            ]
        ];

        $jwt = JWT::encode($token, $this->jwtKey, 'HS256');

        return response()->json([
            'token' => $jwt,
        ]);
    }
}
