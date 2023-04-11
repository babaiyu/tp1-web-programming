<?php

use App\Http\Controllers\Web\ForgotPasswordController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\LoginController;
use App\Http\Controllers\Web\RegisterController;
use App\Http\Controllers\Web\ResetPasswordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'index']);

Route::get('/signin', [LoginController::class, 'index']);
Route::get('/signup', [RegisterController::class, 'index']);
Route::get('/forgot-password', [ForgotPasswordController::class, 'index']);
Route::get('/reset-password/{token}/{email}', [ResetPasswordController::class, 'index']);
