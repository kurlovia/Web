<?php

namespace App\Database;

class ProductDB
{
    private static $products = [
        [
            'id' => 1,
            'name' => 'Gaming PC Pro',
            'price' => 159990,
            'image' => 'pc1.jpg',
            'specs' => [
                'процессор' => 'Intel Core i9-13900K',
                'видеокарта' => 'NVIDIA RTX 4090'
            ],
            'category' => 'Игровые ПК'
        ],
        [
            'id' => 2,
            'name' => 'Ноутбук ASUS ROG',
            'price' => 120000,
            'image' => 'laptop1.jpg',
            'specs' => [
                'процессор' => 'i7-11800H',
                'видеокарта' => 'RTX 3070'
            ],
            'category' => 'Ноутбуки'
        ]
    ];

    public static function all() {
        return self::$products;
    }

    public static function findByCategory($category) {
        return array_values(array_filter(
            self::$products,
            fn($product) => $product['category'] === $category
        ));
    }
}