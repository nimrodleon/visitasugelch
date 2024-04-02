<?php

namespace App\Http\Controllers;

use App\Models\Visitante;
use Illuminate\Http\Client\Request;

class VisitanteController extends Controller
{
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
