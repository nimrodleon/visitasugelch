<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);

        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $query = User::query();

        if ($request->has('query')) {
            $searchQuery = $request->input('query');
            $query->where(function ($q) use ($searchQuery) {
                $q->where('dni', $searchQuery)
                    ->orWhere('nombres', 'like', '%' . $searchQuery . '%')
                    ->orWhere('apellidos', 'like', '%' . $searchQuery . '%');
            });
        }

        $users = $query->paginate($perPage);

        return response()->json($users);
    }

    public function store(Request $request)
    {
        try {
            $user = User::create($request->all());
            return response()->json($user, 201);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'error' => 'El usuario o DNI ya se encuentra registrado'
                ], 400);
            }
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update($request->all());
            return response()->json($user);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'error' => 'El usuario o DNI ya se encuentra registrado'
                ], 400);
            }
        }
    }

    public function passwordChange(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->password = $request->input('password');
        $user->save();
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
