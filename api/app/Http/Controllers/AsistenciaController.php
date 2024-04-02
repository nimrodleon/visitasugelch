<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Client\Request;

class AsistenciaController extends Controller
{
    public function index(Request $request)
    {
        $searchQuery = $request->input('query');
        $perPage = $request->input('perPage', 10);

        $asistencias = Asistencia::join('visitantes', 'asistencias.visitante_id', '=', 'visitantes.id')
            ->when($searchQuery, function ($query) use ($searchQuery) {
                return $query->where(function ($subQuery) use ($searchQuery) {
                    $subQuery->where('visitantes.dni', $searchQuery)
                        ->orWhere('visitantes.nombres', 'like', '%' . $searchQuery . '%');
                });
            })
            ->paginate($perPage);

        return response()->json($asistencias);
    }

    public function store(Request $request)
    {
        $asistencia = Asistencia::create($request->all());
        return response()->json($asistencia, 201);
    }

    public function show(Asistencia $asistencia)
    {
        return response()->json($asistencia);
    }

    public function update(Request $request, Asistencia $asistencia)
    {
        $asistencia->update($request->all());
        return response()->json($asistencia);
    }

    public function destroy(Asistencia $asistencia)
    {
        $asistencia->delete();
        return response()->json(null, 204);
    }
}
