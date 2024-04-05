<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'dni' => '00000000',
            'nombres' => 'Admin',
            'apellidos' => '-',
            'rol' => 'admin',
            'usuario' => 'admin',
            'password' => app('hash')->make('secret')
        ]);
    }
}
