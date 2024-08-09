<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Middleware\isAgent;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class,'logout'])->name('logout');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(isAgent::class)->group(function () {
    Route::post('/properties', [PropertyController::class,'store'])->name('properties.store');
    Route::patch('/properties/{property}', [PropertyController::class,'update'])->name('properties.update');
    Route::delete('/properties/{property}', [PropertyController::class,'delete'])->name('properties.delete');
});

Route::get('/properties', [PropertyController::class,'index'])->name('properties.index');
Route::get('/properties/{property}', [PropertyController::class,'show'])->name('properties.show');

Route::post('/register', [AuthController::class,'register'])->name('register');
Route::post('/login', [AuthController::class,'login'])->name('login');