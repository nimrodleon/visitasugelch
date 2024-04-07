<?php

namespace App\Http\Controllers;

use App\Models\Visitante;
use App\Services\PadronService;
use Illuminate\Http\Request;

class VisitanteController extends Controller
{
    private $padronService;

    public function __construct()
    {
        $this->padronService = new PadronService();
    }

    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $query = Visitante::query();

        $searchQuery = $request->input('query');
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('nombres', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('ap_paterno', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('ap_materno', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('dni', 'LIKE', '%' . $searchQuery . '%');
            });
        }

        $visitantes = $query->paginate($perPage);

        return response()->json($visitantes);
    }

    public function store(Request $request)
    {
        $visitante = Visitante::create($request->all());
        return response()->json($visitante, 201);
    }

    public function show($id)
    {
        $visitante = Visitante::findOrFail($id);
        return response()->json($visitante);
    }

    public function buscarPorDni($dni)
    {
        $visitante = Visitante::where('dni', $dni)->first();
        if (!$visitante) {
            $contribuyente = $this->padronService->buscarPorDni($dni);
            if (!$contribuyente) {
                return response()->json([
                    'error' =>
                    'No se encontró el DNI en la base de datos ni en el padrón'
                ], 404);
            } else {
                $visitante = new Visitante();
                $visitante->dni = $contribuyente['dni'];
                $visitante->nombres_completos = $contribuyente['nombre'];
                $visitante->save();
            }
        }
        return response()->json($visitante);
    }

    public function buscarPorRuc($ruc)
    {
        $contribuyente = $this->padronService->buscarPorRuc($ruc);
        return response()->json($contribuyente);
    }

    public function update(Request $request, $id)
    {
        $visitante = Visitante::findOrFail($id);
        $visitante->update($request->all());
        return response()->json($visitante, 200);
    }

    public function destroy($id)
    {
        Visitante::destroy($id);
        return response()->json(null, 204);
    }
}
