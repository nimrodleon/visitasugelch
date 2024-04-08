<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $table = 'asistencias';
    protected $fillable = [
        'fecha_registro',
        'fecha_visita',
        'visitante_id',
        'nombres_visitante',
        'documento_visitante',
        'entidad_id',
        'rzn_social_entidad',
        'funcionario_id',
        'nombres_funcionario',
        'hora_ingreso',
        'hora_salida',
        'motivo_visita',
        'lugar_id',
        'nombre_lugar',
        'observaciones',
    ];
    public $timestamps = false;

    public function setFechaRegistroAttribute($value)
    {
        $this->attributes['fecha_registro'] = date('Y-m-d', strtotime($value));
    }

    public function setFechaVisitaAttribute($value)
    {
        $this->attributes['fecha_visita'] = date('Y-m-d', strtotime($value));
    }

    public function setHoraIngresoAttribute($value)
    {
        $this->attributes['hora_ingreso'] = date('H:i:s', strtotime($value));
    }

    public function setHoraSalidaAttribute($value)
    {
        $this->attributes['hora_salida'] = date('H:i:s', strtotime($value));
    }
}
