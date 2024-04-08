<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Entidad extends Model
{
    protected $table = 'entidades';
    public $timestamps = false;

    protected $fillable = [
        'ruc',
        'rzn_social',
        'visitante_id'
    ];

    public function visitante(): BelongsTo
    {
        return $this->belongsTo(Visitante::class);
    }
}
