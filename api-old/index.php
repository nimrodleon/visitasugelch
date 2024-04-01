<?php

use App\Models\Usuario;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once __DIR__ . "/vendor/autoload.php";
$capsule = new Illuminate\Database\Capsule\Manager;
$capsule->addConnection(require __DIR__ . "/database.php");
$capsule->setAsGlobal();
$capsule->bootEloquent();

$app = AppFactory::create();


$app->group('/usuarios', function ($group) {
    $group->get('', function (Request $request, Response $response) {
        $usuarios = Usuario::all();
        $response->getBody()->write(json_encode($usuarios));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $group->get('/{id}', function (Request $request, Response $response, $args) {
        $id = $args['id'];
        $usuario = Usuario::find($id);
        if (!$usuario) {
            $response->getBody()->write(json_encode(['message' => 'Usuario not found']));
            return $response->withStatus(404);
        }
        $response->getBody()->write(json_encode($usuario));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $group->post('', function (Request $request, Response $response) {
        $data = $request->getParsedBody();
        var_dump($data, "holaaaaa");
        $usuario = new Usuario($data);
        $usuario->save();
        $response->getBody()->write(json_encode($usuario));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    });

    $group->put('/{id}', function (Request $request, Response $response, $args) {
        $id = $args['id'];
        $usuario = Usuario::find($id);
        if (!$usuario) {
            $response->getBody()->write(json_encode(['message' => 'Usuario not found']));
            return $response->withStatus(404);
        }
        $data = $request->getParsedBody();
        $usuario->fill($data);
        $usuario->save();
        $response->getBody()->write(json_encode($usuario));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $group->delete('/{id}', function (Request $request, Response $response, $args) {
        $id = $args['id'];
        $usuario = Usuario::find($id);
        if (!$usuario) {
            $response->getBody()->write(json_encode(['message' => 'Usuario not found']));
            return $response->withStatus(404);
        }
        $usuario->delete();
        $response->getBody()->write(json_encode(['message' => 'Usuario deleted']));
        return $response->withHeader('Content-Type', 'application/json');
    });
});


$app->run();
