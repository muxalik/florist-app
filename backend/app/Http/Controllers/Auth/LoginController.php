<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\AuthUserResource;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request): JsonResponse
    {
        if (!$request->authenticate()) {
            return response()->json([
                'message' => __('auth.failed'),
            ], 400);
        }

        $token = auth()->user()
            ->createToken('access-token')
            ->plainTextToken;

        return response()->json([
            'user' => AuthUserResource::make(auth()->user()),
            'token' => $token,
        ]);
    }
}
