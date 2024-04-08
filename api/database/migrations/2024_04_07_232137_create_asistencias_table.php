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
            $table->string('nombres_visitante')->nullable();
            $table->string('documento_visitante')->nullable();
            $table->unsignedBigInteger('entidad_id')->nullable();
            $table->string('rzn_social_entidad')->nullable();
            $table->unsignedBigInteger('funcionario_id')->nullable();
            $table->string('nombres_funcionario')->nullable();
            $table->string('hora_ingreso')->nullable();
            $table->string('hora_salida')->nullable();
            $table->string('motivo_visita')->nullable();
            $table->unsignedBigInteger('lugar_id')->nullable();
            $table->string('nombre_lugar')->nullable();
            $table->string('observaciones')->nullable();
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
