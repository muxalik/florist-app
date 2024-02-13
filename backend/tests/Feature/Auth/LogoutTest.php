<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->getJson(
            route('logout'),
            $this->auth($token),
        );

        $response->assertOk();

        $response->assertJsonStructure(['message']);

        $this->assertNull($user->currentAccessToken());
    }

    public function test_unauthenticated_user_cannot_logout(): void
    {
        User::factory()->create();

        $response = $this->getJson(
            route('logout'),
            $this->auth('unreal-token'),
        );

        $response->assertUnauthorized();

        $response->assertJsonStructure(['message']);
    }
}
