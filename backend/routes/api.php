<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RequestPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UpdateTokenController;
use App\Http\Controllers\Auth\VerifyPasswordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['guest:sanctum'])->group(function () {
    Route::post('login', LoginController::class)->name('login');

    Route::post('request-password', RequestPasswordController::class)->name('request-password');
    Route::post('verify-password', VerifyPasswordController::class)->name('verify-password');
    Route::patch('reset-password', ResetPasswordController::class)->name('reset-password');

    Route::post('token', UpdateTokenController::class)->name('token');
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', LogoutController::class)->name('logout');
});
