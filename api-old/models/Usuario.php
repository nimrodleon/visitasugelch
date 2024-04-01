<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = ['dni', 'nombres', 'apellidos', 'rol', 'usuario', 'password'];
    public $timestamps = false;
}
