<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyPasswordRequest;
use Illuminate\Http\JsonResponse;

class VerifyPasswordController extends Controller
{
    public function __invoke(VerifyPasswordRequest $request): JsonResponse
    {
        $request->code()->verify();

        return response()->json([
            'message' => __('passwords.verified'),
        ]);
    }
}
