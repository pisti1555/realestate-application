<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if ($request->bearerToken()) {
            return response()->json([
                'status' => false,
                'message' => 'Already logged in',
            ]);
        }

        try {
            $validate = Validator::make($request->all(), [
                "email"=> ["required", "email"],
                "password"=> ["required", "string"],
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation error',
                    'errors' => $validate->errors(),
                ], 401);
            }
    
            if (!Auth::attempt($request->only(['email','password']))) {
                return response()->json([
                    'status'=> false,
                    'message'=> 'Invalid e-mail or password',
                ]);
            }
    
            $user = User::where('email', $request->email)->first();
            
            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                        'status' => true,
                        'message' => 'Success',
                        'token' => $user->createToken("Personal Access Token")->plainTextToken,
                        'user' => $user,
                    ], 200);
            }
            
        } catch (\Exception $e) {
            return response()->json(["error"=> $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Logged out'
        ]);
    }

    public function register(Request $request)
    {
        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json([
                'status' => false,
                'message' => 'A user with this email already exists.',
            ]);
        }

        try {
            $validate = Validator::make($request->all(), [
                "name"=>["required", "string"],
                "email"=> ["required", "email", "unique:users,email"],
                "password"=> ["required", "string"],
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation error',
                    'errors' => $validate->errors(),
                ], 401);
            }
    
            $user = User::create([
                "name"=>$request->name,
                "email"=> $request->email,
                "password"=> $request->password,
            ]);
    
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'token' => $user->createToken("Personal Access Token")->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(["error"=> $e->getMessage()], 500);
        }
    }



}
