<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use Illuminate\Http\Request;

class EntidadController extends Controller
{
    public function index($visitante_id)
    {
        $entidades = Entidad::where('visitante_id', $visitante_id)->get();
        return response()->json($entidades);
    }

    public function store(Request $request)
    {
        $entidad = Entidad::create($request->all());
        return response()->json($entidad, 201);
    }

    public function show($id)
    {
        $entidad = Entidad::findOrFail($id);
        return response()->json($entidad);
    }

    public function update(Request $request, $id)
    {
        $entidad = Entidad::findOrFail($id);
        $entidad->update($request->all());
        return response()->json($entidad);
    }

    public function destroy($id)
    {
        $entidad = Entidad::findOrFail($id);
        $entidad->delete();
        return response()->json(null, 204);
    }
}
