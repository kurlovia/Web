<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function featured()
    {
        $products = Product::where('is_featured', true)
            ->with('category')
            ->limit(8)
            ->get();
            
        return response()->json($products);
    }
    
    public function categories()
    {
        $categories = Category::withCount('products')
            ->orderBy('products_count', 'desc')
            ->limit(6)
            ->get();
            
        return response()->json($categories);
    }
}