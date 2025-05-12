class UserDB
{
    private static $users = [];

    public static function register($email, $password) {
        self::$users[] = [
            'id' => count(self::$users) + 1,
            'email' => $email,
            'password' => md5($password)
        ];
        return end(self::$users);
    }
}