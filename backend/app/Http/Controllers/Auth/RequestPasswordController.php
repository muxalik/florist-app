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

        $latestCode = $user->verificationCodes()
            ->latest()
            ->first();

        if ($latestCode) {
            $isRecentlyCreated = $latestCode->created_at >= now()->subSeconds(30);

            if ($isRecentlyCreated) {
                return response()->json([
                    'message' => __('passwords.throttled'),
                    'timeoutEnd' => $latestCode->created_at->addSeconds(30),
                ], 429);
            }
        }

        $code = $user->verificationCodes()->create();

        $user->notify(new SendPasswordNotification($code));

        return response()->json([
            'message' => __('passwords.sent', [
                'address' => $user->email,
            ]),
        ]);
    }
}
