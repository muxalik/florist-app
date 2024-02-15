<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateTokenRequest;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;

class UpdateTokenController extends Controller
{
    public function __invoke(UpdateTokenRequest $request): JsonResponse
    {
        $token = PersonalAccessToken::findToken(
            $request->token
        );

        if (!$token) {
            return response()->json([
                'message' => __('auth.token'),
            ], 400);
        }

        $user = $token->tokenable;

        $token->delete();

        $newToken = $user->createToken('accessToken')
            ->plainTextToken;

        return response()->json([
            'token' => $newToken,
        ]);
    }
}
