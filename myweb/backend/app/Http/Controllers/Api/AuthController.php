use Twilio\Rest\Client;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Отправка SMS с кодом
    public function sendCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|phone:AUTO',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Неверный номер'], 400);
        }

        $phone = $request->phone;
        $code = Str::random(4); // Или rand(1000, 9999)
        $expires = Carbon::now()->addMinutes(5);

        // Сохраняем код в БД
        $user = User::updateOrCreate(
            ['phone' => $phone],
            [
                'phone_verification_code' => $code,
                'phone_verification_expires_at' => $expires,
            ]
        );

        // Отправляем SMS через Twilio
        $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
        $twilio->messages->create(
            $phone,
            [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Ваш код: $code",
            ]
        );

        return response()->json(['success' => true]);
    }

    // Проверка кода
    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|phone:AUTO',
            'code' => 'required|digits:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Неверные данные'], 400);
        }

        $user = User::where('phone', $request->phone)
            ->where('phone_verification_code', $request->code)
            ->where('phone_verification_expires_at', '>', now())
            ->first();

        if (!$user) {
            return response()->json(['error' => 'Неверный код'], 400);
        }

        // Генерируем токен (Sanctum/JWT)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}