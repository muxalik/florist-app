<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VerifyPasswordTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_verify_password(): void
    {
        $user = User::factory()->create();

        $code = $user->verificationCodes()->create();

        $response = $this->postJson(
            route('verify-password'),
            ['code' => $code->code],
        );

        $response->assertOk();

        $code->refresh();

        $this->assertNotNull($code->verified_at);
    }
    
    public function test_authenticated_user_cannot_verify_password(): void
    {
        $user = User::factory()->create();

        $code = $user->verificationCodes()->create();

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->postJson(
            route('verify-password'),
            ['code' => $code->code],
            $this->auth($token),
        );

        $response->assertForbidden();

        $code->refresh();

        $this->assertNull($code->verified_at);
    }
}
