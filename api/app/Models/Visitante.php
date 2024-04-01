<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Visitante extends Model
{
    protected $table = 'visitantes';
    protected $fillable = ['dni', 'ap_paterno', 'ap_materno', 'nombres'];
    public $timestamps = false;

    public function asistencias(): HasMany
    {
        return $this->hasMany(Asistencia::class);
    }
}
