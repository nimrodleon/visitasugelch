<?php

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

require_once "vendor/autoload.php";

$capsule = new Capsule;
$capsule->addConnection(require __DIR__ . "/database.php");
$capsule->setAsGlobal();
$capsule->bootEloquent();

Capsule::schema()->create('usuarios', function (Blueprint $table) {
    $table->id();
    $table->string('dni')->unique();
    $table->string('nombres')->nullable();
    $table->string('apellidos')->nullable();
    $table->string('rol')->nullable();
    $table->string('usuario')->unique();
    $table->string('password')->nullable();
});

Capsule::schema()->create('visitantes', function (Blueprint $table) {
    $table->id();
    $table->string('dni')->unique();
    $table->string('ap_paterno')->nullable();
    $table->string('ap_materno')->nullable();
    $table->string('nombres')->nullable();
});

Capsule::schema()->create('asistencia', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('visitante_id');
    $table->string('fecha')->nullable();
    $table->string('hora')->nullable();
    $table->foreign('visitante_id')->references('id')->on('visitantes');
});
