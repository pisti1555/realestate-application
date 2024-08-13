<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterAgentRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Already logged in',
            ]);
        }

        try {
            $validated = $request->validated();
    
            if (!Auth::guard('web')->attempt($validated)) {
                return response()->json([
                    'status'=> false,
                    'message'=> 'Invalid e-mail or password',
                ]);
            }
    
            $user = User::where('email', $validated['email'])->first();
            
            if (Hash::check($validated['password'], $user->password)) {
                if ($user->hasRole('agent')) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Success',
                        'token' => $user->createToken(
                            'AgentToken', 
                            [
                                'view-property', 
                                'store-property',
                                'update-property', 
                                'delete-property'
                            ]
                        )->plainTextToken,
                        'user' => $user,
                    ], 200);
                }

                return response()->json([
                        'status' => true,
                        'message' => 'Success',
                        'token' => $user->createToken('UserToken', [ 'view-property', 'comment', ])->plainTextToken,
                        'user' => $user,
                    ], 200);
            }
            
        } catch (\Exception $e) {
            return response()->json(["error"=> $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Couldnt log out an unauthenticated user',
            ]);
        }

        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logged out'
        ]);
    }

    public function register(RegisterUserRequest $request)
    {
        if (Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Already logged in',
            ]);
        }

        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response()->json([
                'status' => false,
                'message' => 'A user with this email already exists.',
            ]);
        }

        try {
            $validated = $request->validated();

            if (! $validated) {
                return response()->json([
                    'status'=> false,
                    'message'=> 'Invalid input data'
                ]);
            }
    
            $user = User::create($validated);
    
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'token' => $user->createToken('UserToken', [ 'view-property', 'comment', ])->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(["error"=> $e->getMessage()], 500);
        }
    }

    public function registerAgent(RegisterAgentRequest $request)
    {
        if (Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Already logged in',
            ]);
        }

        $exists = User::where('email', $request->email)->first();
        if ($exists) {
            return response()->json([
                'status' => false,
                'message' => 'A user with this email already exists.',
            ]);
        }

        try {
            $validated = $request->validated();

            if (! $validated) {
                return response()->json([
                    'status'=> false,
                    'message'=> 'Invalid input data',
                ]);
            }

            $imgPath = $request->image->store('users', 'public');
            $validated['image'] = env('APP_URL') . '/storage/' . $imgPath;
    
            $user = User::create($validated);
            $user->role = 'agent';
            $user->save();
    
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'token' => $user->createToken(
                    'AgentToken', 
                    [
                        'view-property', 
                        'store-property',
                        'update-property', 
                        'delete-property'
                    ]
                )->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(["error"=> $e->getMessage()], 500);
        }
    }



}
