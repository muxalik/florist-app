<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendPasswordRequest;
use App\Notifications\SendPasswordNotification;
use Illuminate\Http\JsonResponse;

class RequestPasswordController extends Controller
{
    public function __invoke(SendPasswordRequest $request): JsonResponse
    {
        $user = $request->findUser();

        $code = $user->verificationCodes()->create();

        $user->notify(new SendPasswordNotification($code));

        return response()->json([
            'message' => __('passwords.sent', [
                'address' => $user->email,
            ]),
        ]);
    }
}
