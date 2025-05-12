class CartDB
{
    private static $carts = [];

    public static function addToCart($userId, $productId) {
        if (!isset(self::$carts[$userId])) {
            self::$carts[$userId] = [];
        }
        self::$carts[$userId][] = $productId;
    }
}