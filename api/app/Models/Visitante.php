<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Visitante extends Model
{
    protected $table = 'visitantes';
    protected $fillable = ['dni', 'nombres_completos'];
    public $timestamps = false;

    public function asistencias(): HasMany
    {
        return $this->hasMany(Asistencia::class);
    }

    public function entidades(): HasMany
    {
        return $this->hasMany(Entidad::class);
    }
}
