<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $table = 'funcionarios';
    public $timestamps = false;

    // Define los campos de la tabla 'funcionarios'
    protected $fillable = [
        'dni',
        'nombres_completos',
        'lugar_id',
    ];
}
