<?php

use Illuminate\Http\Request;
use App\Database\ProductDB;
use App\Database\CartDB;
use App\Database\UserDB;

Route::get('/products', function(Request $request) {
    $category = $request->input('category');
    return $category 
        ? response()->json(ProductDB::getByCategory($category))
        : response()->json(ProductDB::all());
});

Route::get('/products/{id}', function($id) {
    $product = ProductDB::find($id);
    return $product 
        ? response()->json($product)
        : response()->json(['error' => 'Product not found'], 404);
});

Route::post('/cart/add', function(Request $request) {
    CartDB::addToCart($request->user_id, $request->product_id);
    return response()->json(['status' => 'success']);
});

Route::post('/register', function(Request $request) {
    $user = UserDB::register($request->email, $request->password);
    return response()->json($user);
});