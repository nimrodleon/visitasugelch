<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class EntidadController extends Controller
{
    public function index($visitante_id)
    {
        $entidades = Entidad::where('visitante_id', $visitante_id)->get();
        return response()->json($entidades);
    }

    public function search(Request $request, $visitante_id)
    {
        $querySearch = $request->input('query', '');
        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $query = Entidad::query();
        $query->where('visitante_id', $visitante_id);

        if ($querySearch) {
            $query->where(function ($q) use ($querySearch) {
                $q->where('rzn_social', 'LIKE', '%' . $querySearch . '%')
                    ->orWhere('ruc', 'LIKE', '%' . $querySearch . '%');
            });
        }

        $entidades = $query->paginate($perPage);

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
