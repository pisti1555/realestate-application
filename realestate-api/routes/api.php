<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;

Route::middleware('unauth')->group(function () {
    Route::post('/register', [AuthController::class,'register'])->name('register');
    Route::post('/register-agent', [AuthController::class,'registerAgent'])->name('register-agent');
    Route::post('/login', [AuthController::class,'login'])->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class,'logout'])->name('logout');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware('check-role')->group(function () {
    Route::get('/is-own-property/{property}', [PropertyController::class,'isOwn'])->name('properties.is-own');
    Route::post('/properties', [PropertyController::class,'store'])->name('properties.store');
    Route::post('/properties/{property}', [PropertyController::class,'update'])->name('properties.update');
    Route::delete('/properties/{property}', [PropertyController::class,'delete'])->name('properties.delete');
});

Route::get('/properties', [PropertyController::class,'index'])->name('properties.index');
Route::get('/properties/{property}', [PropertyController::class,'show'])->name('properties.show');


