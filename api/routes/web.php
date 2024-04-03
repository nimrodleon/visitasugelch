<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/users', 'UserController@index');
$router->post('/users', 'UserController@store');
$router->get('/users/{id}', 'UserController@show');
$router->put('/users/{id}', 'UserController@update');
$router->delete('/users/{id}', 'UserController@destroy');

$router->get('/visitantes', 'VisitanteController@index');
$router->post('/visitantes', 'VisitanteController@store');
$router->get('/visitantes/{id}', 'VisitanteController@show');
$router->put('/visitantes/{id}', 'VisitanteController@update');
$router->delete('/visitantes/{id}', 'VisitanteController@destroy');

$router->get('/asistencias', 'AsistenciaController@index');
$router->post('/asistencias', 'AsistenciaController@store');
$router->get('/asistencias/{asistencia}', 'AsistenciaController@show');
$router->put('/asistencias/{asistencia}', 'AsistenciaController@update');
$router->delete('/asistencias/{asistencia}', 'AsistenciaController@destroy');

$router->get('/example', 'ExampleController@index');
