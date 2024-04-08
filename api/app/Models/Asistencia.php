<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $table = 'asistencias';
    protected $fillable = [
        'visitante_id',
        'nombres_visitante',
        'documento_visitante',
        'entidad_id',
        'rzn_social_entidad',
        'funcionario_id',
        'nombres_funcionario',
        'motivo_visita',
        'lugar_id',
        'nombre_lugar',
        'observaciones',
    ];
    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->fecha_registro = date('Y-m-d');
            $model->fecha_visita = date('Y-m-d');
            $model->hora_ingreso = date('H:i:s');
        });
    }
}
