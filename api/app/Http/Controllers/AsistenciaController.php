<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;

class AsistenciaController extends Controller
{
    public function index(Request $request)
    {
        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $searchQuery = $request->input('query');
        $perPage = $request->input('perPage', 10);

        $formattedFromDate = date('Y-m-d', strtotime($fromDate));
        $formattedToDate = date('Y-m-d', strtotime($toDate));

        $asistencias = Asistencia::when($formattedFromDate && $formattedToDate, function ($query) use ($formattedFromDate, $formattedToDate) {
            return $query->whereBetween('fecha_registro', [$formattedFromDate, $formattedToDate]);
        })
            ->when($searchQuery, function ($query) use ($searchQuery) {
                return $query->where(function ($subQuery) use ($searchQuery) {
                    $subQuery->where('documento_visitante', $searchQuery)
                        ->orWhere('nombres_visitante', 'like', '%' . $searchQuery . '%');
                });
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return response()->json($asistencias);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'visitante_id' => 'required',
            'nombres_visitante' => 'required',
            'documento_visitante' => 'required',
            'entidad_id' => 'required',
            'rzn_social_entidad' => 'required',
            'funcionario_id' => 'required',
            'nombres_funcionario' => 'required',
            'motivo_visita' => 'required',
            'lugar_id' => 'required',
            'nombre_lugar' => 'required',
        ]);
        $asistencia = Asistencia::create($request->all());
        return response()->json($asistencia, 201);
    }

    public function show(Asistencia $asistencia)
    {
        return response()->json($asistencia);
    }

    public function marcar_hora_salida(Asistencia $asistencia)
    {
        $asistencia->hora_salida = date('H:i:s');
        $asistencia->save();
        return response()->json($asistencia);
    }

    public function destroy(Asistencia $asistencia)
    {
        $asistencia->delete();
        return response()->json(null, 204);
    }
}
