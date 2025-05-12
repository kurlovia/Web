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
                'видеокарта' => 'NVIDIA RTX 4090',
                'оперативная память' => '64GB DDR5',
                'хранилище' => '2TB NVMe SSD'
            ],
            'category' => 'Игровые ПК'
        ],
        // ... другие товары
    ];
        ],
        [
            'id' => 2,
            'name' => 'HYPERPC GAMING',
            'category' => 'gaming-pc',
            'price' => 89990,
            'image' => 'hyperpc-gaming.jpg',
            'specs' => [
                'AMD Ryzen 7 7800X',
                'NVIDIA RTX 4070',
                '32GB DDR4 RAM',
                '1TB NVMe SSD'
            ]
        ]
    ];

    public static function getForComparison($ids) {
        return array_filter(self::$products, fn($p) => in_array($p['id'], $ids));
    }
}