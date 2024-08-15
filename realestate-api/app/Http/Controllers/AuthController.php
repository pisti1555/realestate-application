<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
       return AuthService::login($request);
    }

    public function logout(Request $request)
    {
        return AuthService::logout($request);
    }

    public function register(RegistrationRequest $request)
    {
        return AuthService::register($request);
    }
}