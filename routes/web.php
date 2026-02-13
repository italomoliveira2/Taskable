<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('auth.login');
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('auth.register');

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('home');
    Route::get('/task/{id}', [TaskController::class, 'show'])->name('task.show');
    Route::post('/task', [TaskController::class, 'store'])->name('task.store');
    Route::match(['put', 'patch'], '/task/{task}', [TaskController::class, 'update'])->name('task.update');
    Route::delete('/task/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
    Route::post('/auth/logout', [LogoutController::class, 'logout'])->name('auth.logout');
});
