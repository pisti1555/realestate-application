<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function show(string $id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status'=> false,
                'message'=> 'User not found with the given ID'
            ], 404);
        }
        
        $resource = new UserResource($user);
        if (!$resource) {
            return response()->json([
                'status'=> false,
                'message'=> 'Resource could not be created from the given user'
            ], 404);
        }

        return $resource;
    }
}
