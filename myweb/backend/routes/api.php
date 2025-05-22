<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/featured-products', [ProductController::class, 'featured']);
Route::get('/popular-categories', [ProductController::class, 'categories']);
Route::prefix('auth')->group(function () {
    Route::post('/sms/send-code', [SMSAuthController::class, 'sendVerificationCode']);
    Route::post('/sms/verify', [SMSAuthController::class, 'verifyCode']);
});