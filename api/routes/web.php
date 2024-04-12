<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/login', 'AuthController@login');
$router->get('/asistencias', 'AsistenciaController@index');

$router->group(['middleware' => 'jwt'], function () use ($router) {
    $router->get('/user', 'AuthController@userData');
    $router->group(['middleware' => 'role:admin'], function () use ($router) {
        $router->get('/users', 'UserController@index');
        $router->post('/users', 'UserController@store');
        $router->get('/users/{id}', 'UserController@show');
        $router->put('/users/{id}', 'UserController@update');
        $router->patch('/users/{id}', 'UserController@passwordChange');
        $router->delete('/users/{id}', 'UserController@destroy');
        $router->get('/search-lugares', 'LugarController@search');
        $router->post('/lugares', 'LugarController@store');
        $router->get('/lugares/{id}', 'LugarController@show');
        $router->put('/lugares/{id}', 'LugarController@update');
        $router->delete('/lugares/{id}', 'LugarController@destroy');
        $router->get('/search-funcionarios', 'FuncionarioController@search');
        $router->post('/funcionarios', 'FuncionarioController@store');
        $router->get('/funcionarios/{id}', 'FuncionarioController@show');
        $router->put('/funcionarios/{id}', 'FuncionarioController@update');
        $router->delete('/funcionarios/{id}', 'FuncionarioController@destroy');
        $router->delete('/asistencias/{id}', 'AsistenciaController@destroy');
        $router->delete('/entidades/{id}', 'EntidadController@destroy');
        $router->delete('/visitantes/{id}', 'VisitanteController@destroy');
    });
    $router->group(['middleware' => 'role:admin,user'], function () use ($router) {
        $router->post('/asistencias', 'AsistenciaController@store');
        $router->get('/asistencias/{asistencia}', 'AsistenciaController@show');
        $router->patch('/asistencias/{id}', 'AsistenciaController@marcar_hora_salida');
        $router->get('/visitantes', 'VisitanteController@index');
        $router->post('/visitantes', 'VisitanteController@store');
        $router->get('/visitantes/{id}', 'VisitanteController@show');
        $router->put('/visitantes/{id}', 'VisitanteController@update');
        $router->get('/visitantes/{dni}/dni', 'VisitanteController@buscarPorDni');
        $router->get('/visitantes/{ruc}/ruc', 'VisitanteController@buscarPorRuc');
        $router->post('/entidades', 'EntidadController@store');
        $router->get('/entidades/{id}', 'EntidadController@show');
        $router->put('/entidades/{id}', 'EntidadController@update');
        $router->get('/entidades/{visitante_id}/visitante', 'EntidadController@index');
        $router->get('/search-entidades/{visitante_id}', 'EntidadController@search');
        $router->get('/lugares', 'LugarController@index');
        $router->get('/funcionarios/{lugar_id}/lugar', 'FuncionarioController@index');
    });
});
