<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asistencia extends Model
{
    protected $table = 'asistencias';
    protected $fillable = ['visitante_id', 'fecha', 'hora'];
    public $timestamps = false;

    public function visitante(): BelongsTo
    {
        return $this->belongsTo(Visitante::class);
    }
}
