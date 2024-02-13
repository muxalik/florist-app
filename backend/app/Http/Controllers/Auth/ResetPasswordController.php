<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Notifications\UpdatePasswordNotification;
use Illuminate\Http\JsonResponse;

class ResetPasswordController extends Controller
{
    public function __invoke(ResetPasswordRequest $request): JsonResponse
    {
        $code = $request->verificationCode();

        if (is_null($code) || !$code->isVerified() || $code->isExpired()) {
            return response()->json([
                'errors' => [
                    'session' => __('passwords.token'),
                ],
            ], 400);
        }

        $user = $code->user;

        $user->update(['password' => $request->password]);

        $code->delete();

        $user->notify(new UpdatePasswordNotification());

        return response()->json([
            'message' => __('passwords.reset'),
        ]);
    }
}
