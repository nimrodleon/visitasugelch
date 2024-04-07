<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asistencias', function (Blueprint $table) {
            $table->id();
            $table->string('fecha_registro')->nullable();
            $table->string('fecha_visita')->nullable();
            $table->unsignedBigInteger('visitante_id')->nullable();
            $table->unsignedBigInteger('entidad_id')->nullable();
            $table->unsignedBigInteger('funcionario_id')->nullable();
            $table->string('hora_ingreso')->nullable();
            $table->string('hora_salida')->nullable();
            $table->string('motivo_visita')->nullable();
            $table->unsignedBigInteger('lugar_id')->nullable();
            $table->string('observaciones')->nullable();
            $table->foreign('visitante_id')->references('id')->on('visitantes');
            $table->foreign('entidad_id')->references('id')->on('entidades');
            $table->foreign('funcionario_id')->references('id')->on('funcionarios');
            $table->foreign('lugar_id')->references('id')->on('lugares');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asistencias');
    }
};
