<?php

namespace App\Database;

class ProductDB
{
    private static $products = [
        [
            'id' => 1,
            'name' => 'Игровой ПК',
            'price' => 89990,
            'specs' => 'RTX 3060, 16GB RAM',
            'images' => ['pc1.jpg', 'pc2.jpg']
        ],
        [
            'id' => 2,
            'name' => 'Ноутбук ASUS',
            'price' => 65000,
            'specs' => 'i5, 8GB RAM',
            'images' => ['laptop1.jpg', 'laptop2.jpg']
        ]
    ];

    public static function all() {
        return self::$products;
    }

    public static function find($id) {
        return collect(self::$products)->firstWhere('id', $id);
    }
}