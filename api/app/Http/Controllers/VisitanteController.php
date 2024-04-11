<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\Visitante;
use App\Services\PadronService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class VisitanteController extends Controller
{
    private $padronService;

    public function __construct()
    {
        $this->padronService = new PadronService();
    }

    public function index(Request $request)
    {
        $searchQuery = $request->input('query');
        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $query = Visitante::query();

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('nombres_completos', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('dni', 'LIKE', '%' . $searchQuery . '%');
            });
        }

        $visitantes = $query->paginate($perPage);

        return response()->json($visitantes);
    }

    public function store(Request $request)
    {
        try {
            $visitante = Visitante::create($request->all());
            return response()->json($visitante, 201);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'error' => 'El DNI ya se encuentra registrado'
                ], 400);
            }
        }
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
                $entidad = new Entidad();
                $entidad->ruc = $contribuyente['ruc'];
                $entidad->rzn_social = $contribuyente['nombre'];
                $entidad->visitante_id = $visitante->id;
                $entidad->save();
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
        try {
            $visitante = Visitante::findOrFail($id);
            $visitante->update($request->all());
            return response()->json($visitante, 200);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'error' => 'El DNI ya se encuentra registrado'
                ], 400);
            }
        }
    }

    public function destroy($id)
    {
        Visitante::destroy($id);
        return response()->json(null, 204);
    }
}
