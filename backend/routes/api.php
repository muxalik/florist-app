<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RequestPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UpdateTokenController;
use App\Http\Controllers\Auth\VerifyPasswordController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\CategoryExcelController;
use App\Http\Controllers\Tag\TagController;
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
    // Categories 
    Route::prefix('categories')->as('categories.')->group(function () {
        Route::post('{category}/image', [CategoryController::class, 'updateImage'])->name('update-image');
        Route::get('list', [CategoryController::class, 'list'])->name('list');
        Route::get('export/excel', CategoryExcelController::class)->name('export-excel');
    });

    Route::apiResource('categories', CategoryController::class);

    // Tags
    Route::prefix('tags')->as('tags.')->group(function () {
        Route::get('export/excel', CategoryExcelController::class)->name('export-excel');
    });

    Route::apiResource('tags', TagController::class);

    Route::get('logout', LogoutController::class)->name('logout');
});
