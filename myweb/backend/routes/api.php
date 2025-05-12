use Illuminate\Http\Request;
Route::get('/products', function() {
    return response()->json(App\Database\ProductDB::all());  
});

Route::get('/products/{id}', function($id) {  
    return response()->json(App\Database\ProductDB::find($id));
});

Route::get('/products/filter', function(Request $request) {
    $products = ProductDB::all();  
    if ($request->has('min_price')) {
        $products = array_filter($products, fn($p) => $p['price'] >= $request->min_price);
    }
    return response()->json(array_values($products));
});