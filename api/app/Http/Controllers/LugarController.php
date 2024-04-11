<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class LugarController extends Controller
{
    public function index()
    {
        $lugares = Lugar::all();
        return response()->json($lugares);
    }

    public function search(Request $request)
    {
        $querySearch = $request->input('query');
        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $query = Lugar::query();
        if ($querySearch) {
            $query->where(function ($q) use ($querySearch) {
                $q->where('nombre', 'LIKE', '%' . $querySearch . '%');
            });
        }

        $lugares = $query->paginate($perPage);

        return response()->json($lugares);
    }

    public function store(Request $request)
    {
        $lugar = Lugar::create($request->all());
        return response()->json($lugar, 201);
    }

    public function show($id)
    {
        $lugar = Lugar::find($id);
        if (!$lugar) {
            return response()->json(['message' => 'Lugar not found'], 404);
        }
        return response()->json($lugar);
    }

    public function update(Request $request, $id)
    {
        $lugar = Lugar::find($id);
        if (!$lugar) {
            return response()->json(['message' => 'Lugar not found'], 404);
        }
        $lugar->fill($request->all());
        $lugar->save();
        return response()->json($lugar);
    }

    public function destroy($id)
    {
        $lugar = Lugar::find($id);
        if (!$lugar) {
            return response()->json(['message' => 'Lugar not found'], 404);
        }
        $lugar->delete();
        return response()->json(['message' => 'Lugar deleted']);
    }
}
