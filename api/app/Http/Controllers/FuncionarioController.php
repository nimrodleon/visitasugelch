<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class FuncionarioController extends Controller
{
    public function index($lugar_id)
    {
        $funcionarios = Funcionario::where('lugar_id', $lugar_id)->get();
        return response()->json($funcionarios);
    }

    public function search(Request $request)
    {
        $querySearch = $request->input('query', '');
        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $query = Funcionario::query();

        $query->join('lugares', 'funcionarios.lugar_id', '=', 'lugares.id')
            ->select('funcionarios.*', 'lugares.id as fk', 'lugares.nombre')
            ->where(function ($q) use ($querySearch) {
                $q->where('funcionarios.nombres_completos', 'LIKE', '%' . $querySearch . '%');
            });

        $lugares = $query->paginate($perPage);

        return response()->json($lugares);
    }

    public function store(Request $request)
    {
        $funcionario = Funcionario::create($request->all());
        return response()->json($funcionario, 201);
    }

    public function show($id)
    {
        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario not found'], 404);
        }
        return response()->json($funcionario);
    }

    public function update(Request $request, $id)
    {
        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario not found'], 404);
        }
        $funcionario->update($request->all());
        return response()->json($funcionario);
    }

    public function destroy($id)
    {
        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario not found'], 404);
        }
        $funcionario->delete();
        return response()->json(['message' => 'Funcionario deleted']);
    }
}
