<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class SMSAuthController extends Controller
{
    public function sendVerificationCode(Request $request)
    {
        $request->validate(['phone' => 'required|string|min:10']);

        $code = Str::random(6); // Или rand(100000, 999999)
        $expires = Carbon::now()->addMinutes(5);

        $user = User::updateOrCreate(
            ['phone' => $request->phone],
            [
                'phone_verification_code' => $code,
                'phone_verification_expires_at' => $expires,
            ]
        );

        // Отправка SMS через Twilio
        $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
        $twilio->messages->create(
            $request->phone,
            [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Ваш код подтверждения: $code",
            ]
        );

        return response()->json(['success' => true]);
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('phone', $request->phone)
            ->where('phone_verification_code', $request->code)
            ->where('phone_verification_expires_at', '>', Carbon::now())
            ->first();

        if (!$user) {
            return response()->json(['error' => 'Неверный код или номер'], 401);
        }

        $user->update(['phone_verified' => true]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}