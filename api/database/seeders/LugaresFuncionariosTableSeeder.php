<?php

namespace Database\Seeders;

use App\Models\Funcionario;
use App\Models\Lugar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LugaresFuncionariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lugar_direccion = new Lugar();
        $lugar_direccion->nombre = 'DIRECCION GENERAL UGEL CHINCHEROS';
        $lugar_direccion->save();

        $lugar_mesa_partes = new Lugar();
        $lugar_mesa_partes->nombre = 'MESA DE PARTES';
        $lugar_mesa_partes->save();

        $lugar_imagen_institucional = new Lugar();
        $lugar_imagen_institucional->nombre = 'IMAGEN INSTITUCIONAL';
        $lugar_imagen_institucional->save();

        $lugar_asesoria_juridica = new Lugar();
        $lugar_asesoria_juridica->nombre = 'OFICINA ASESORIA JURIDICA';
        $lugar_asesoria_juridica->save();

        $lugar_gestion_administrativa = new Lugar();
        $lugar_gestion_administrativa->nombre = 'AREA DE GESTION ADMINISTRATIVA';
        $lugar_gestion_administrativa->save();

        $lugar_abastecimiento = new Lugar();
        $lugar_abastecimiento->nombre = 'OFICINA DE ABASTECIMIENTO';
        $lugar_abastecimiento->save();

        $lugar_contabilidad = new Lugar();
        $lugar_contabilidad->nombre = 'OFICINA DE CONTABILIDAD';
        $lugar_contabilidad->save();

        $lugar_tesoreria = new Lugar();
        $lugar_tesoreria->nombre = 'OFICINA DE TESORERIA';
        $lugar_tesoreria->save();

        $lugar_caja = new Lugar();
        $lugar_caja->nombre = 'OFICINA DE CAJA';
        $lugar_caja->save();

        $lugar_recursos_humanos = new Lugar();
        $lugar_recursos_humanos->nombre = 'OFICINA DE RECURSOS HUMANOS';
        $lugar_recursos_humanos->save();

        $lugar_siagie = new Lugar();
        $lugar_siagie->nombre = 'SIAGIE';
        $lugar_siagie->save();

        $funcionario_direccion = new Funcionario();
        $funcionario_direccion->nombres_completos = 'SANCHEZ VERGARA LUIS MOISES';
        $funcionario_direccion->lugar_id = $lugar_direccion->id;
        $funcionario_direccion->save();

        $funcionario_mesa_partes = new Funcionario();
        $funcionario_mesa_partes->nombres_completos = 'POMASONCCO ROBLES ABEL ARMANDO';
        $funcionario_mesa_partes->lugar_id = $lugar_mesa_partes->id;
        $funcionario_mesa_partes->save();

        $funcionario_imagen_institucional = new Funcionario();
        $funcionario_imagen_institucional->nombres_completos = 'SALCEDO RAMIREZ WILBER';
        $funcionario_imagen_institucional->lugar_id = $lugar_imagen_institucional->id;
        $funcionario_imagen_institucional->save();

        $funcionario_asesoria_juridica = new Funcionario();
        $funcionario_asesoria_juridica->nombres_completos = 'ARAPA	PACHECO	ANABEL';
        $funcionario_asesoria_juridica->lugar_id = $lugar_asesoria_juridica->id;
        $funcionario_asesoria_juridica->save();

        $funcionario_gestion_administrativa = new Funcionario();
        $funcionario_gestion_administrativa->nombres_completos = 'HUISA BUSTIOS JOSE EDMUNDO';
        $funcionario_gestion_administrativa->lugar_id = $lugar_gestion_administrativa->id;
        $funcionario_gestion_administrativa->save();

        $funcionario_abastecimiento = new Funcionario();
        $funcionario_abastecimiento->nombres_completos = 'OLANO ALTAMIRANO IVONNE';
        $funcionario_abastecimiento->lugar_id = $lugar_abastecimiento->id;
        $funcionario_abastecimiento->save();

        $funcionario_contabilidad = new Funcionario();
        $funcionario_contabilidad->nombres_completos = 'TORRE MARCELO RICHARD CELESTINO';
        $funcionario_contabilidad->lugar_id = $lugar_contabilidad->id;
        $funcionario_contabilidad->save();

        $funcionario_tesoreria = new Funcionario();
        $funcionario_tesoreria->nombres_completos = 'MALPARTIDA SERRANO MOISES';
        $funcionario_tesoreria->lugar_id = $lugar_tesoreria->id;
        $funcionario_tesoreria->save();

        $funcionario_caja = new Funcionario();
        $funcionario_caja->nombres_completos = 'RIVAS SANCHEZ PEDRO';
        $funcionario_caja->lugar_id = $lugar_caja->id;
        $funcionario_caja->save();

        $funcionario_recursos_humanos = new Funcionario();
        $funcionario_recursos_humanos->nombres_completos = 'TORRES BULEJE ROCIO VANESSA';
        $funcionario_recursos_humanos->lugar_id = $lugar_recursos_humanos->id;
        $funcionario_recursos_humanos->save();

        $funcionario_siagie = new Funcionario();
        $funcionario_siagie->nombres_completos = 'MEDINA LIMACHI JEFFERSON';
        $funcionario_siagie->lugar_id = $lugar_siagie->id;
        $funcionario_siagie->save();
    }
}
