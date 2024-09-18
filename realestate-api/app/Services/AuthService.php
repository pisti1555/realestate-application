<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class AuthService
{
  public static function register(RegistrationRequest $request)
  {
    $USER = 1;
    $AGENT = 2;
    $type = $USER;

    if (User::where('email', $request->email)->exists()) {
        return response()->json([
            'status' => false,
            'message' => 'A user with this email already exists.',
        ], 409);
    }

    if ($request->phone && $request->image) {
      $type = $AGENT;
    }

    try {
      $validated = $request->validated();

      switch ($type) {
        case $USER: {
          return AuthService::createUser([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'birth_date' => $validated['birth_date'],
            'sex' => $validated['sex']
          ]);
        }

        case $AGENT: {
          $imgPath = $request->image->store('users', 'public');
          $validated['image'] = env('APP_URL') . '/storage/' . $imgPath;
          return AuthService::createAgent([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'image' => $validated['image'],
            'phone' => $validated['phone'],
            'description' => $validated['description'],
            'birth_date' => $validated['birth_date'],
            'sex' => $validated['sex'],
            'tax_number' => $validated['tax_number'],
            'country' => $validated['country'],
            'city' => $validated['city'],
            'postal_code' => $validated['postal_code'],
          ]);
        }

        default: {
          return response()->json([
            'status'=> false,
            'message'=> 'An error occoured on the server side'
          ], 500);
        }
      }

    } catch(ValidationException $e) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'An unexpected error occurred on the server side',
            'errors' => $e,
        ], 500);
    }
  }

  public static function login(LoginRequest $request)
  {
    try {
      $validated = $request->validated();

      if (!Auth::guard('web')->attempt($validated)) {
        return response()->json([
          'status' => false,
          'message' => 'Invalid e-mail or password',
        ], 403);
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
            'user' => new UserResource($user)
          ], 200);
        } else if ($user->hasRole('user')){
          return response()->json([
            'status' => true,
            'message' => 'Success',
            'token' => $user->createToken('UserToken', ['view-property', 'comment'])->plainTextToken,
            'user' => new UserResource($user),
          ], 200);
        } else {
          return response()->json([
            'status'=> false,
            'message'=> 'Unexpected error',
          ]);
        }
      } else {
        return response()->json([
            'status' => false,
            'message' => 'Invalid password',
        ], 403);
      }
    } catch (ValidationException $e) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'An unexpected error occurred on the server side',
            'error' => $e->getMessage()
        ], 500);
    }
  }

  public static function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    return response()->json([
        'status' => true,
        'message' => 'Logged out'
    ]);
  }


  // ----- Create functions -----

  private static function createUser($data) 
  {
    $user = User::create($data);
    return response()->json([
        'status' => true,
        'message' => 'Success',
        'token' => $user->createToken('UserToken', [ 'view-property', 'comment', ])->plainTextToken,
        'user' => $user,
    ]);
  }

  private static function createAgent($data)
  {
    $user = User::create($data);
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
  } 
}
