<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

Route::get('/featured-products', [ProductController::class, 'featured']);
Route::get('/popular-categories', [ProductController::class, 'categories']);