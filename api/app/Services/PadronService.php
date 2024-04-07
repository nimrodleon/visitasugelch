<?php

namespace App\Services;

class PadronService
{
    private $db;

    public function __construct()
    {
        $this->db = new \PDO('sqlite:' . base_path('padron_reducido_ruc.db'));
    }

    public function buscarPorDni($dni)
    {
        $statement = $this->db->prepare('SELECT * FROM contribuyentes WHERE dni = :dni');
        $statement->execute([':dni' => $dni]);
        return $statement->fetch(\PDO::FETCH_ASSOC);
    }

    public function buscarPorRuc($ruc)
    {
        $statement = $this->db->prepare('SELECT * FROM contribuyentes WHERE ruc = :ruc');
        $statement->execute([':ruc' => $ruc]);
        return $statement->fetch(\PDO::FETCH_ASSOC);
    }
}
