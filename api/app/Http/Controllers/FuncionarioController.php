<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    public function index($lugar_id)
    {
        $funcionarios = Funcionario::where('lugar_id', $lugar_id)->get();
        return response()->json($funcionarios);
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
